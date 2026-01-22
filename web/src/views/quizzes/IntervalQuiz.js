/* =========================================
   1. CONFIG & STATE
   ========================================= */
const INTERVAL_MAP = {
    // 음정 (반음 개수)
    'm2': 1, 'M2': 2, 'm3': 3, 'M3': 4, 'P1': 0, 'P4': 5, 'aug4': 6, 'dim5': 6, 'P5': 7, 'm6': 8, 'M6': 9, 'm7': 10, 'M7': 11, 'P8': 12,
    // 화음 (근음으로부터의 반음 간격)
    'major': [0, 4, 7], 'minor': [0, 3, 7], 'aug': [0, 4, 8], 'dim': [0, 3, 6],
    'maj7': [0, 4, 7, 11], 'dom7': [0, 4, 7, 10], 'min7': [0, 3, 7, 10], 'm7b5': [0, 3, 6, 10], 'dim7': [0, 3, 6, 9]
};
const SAMPLES_CONFIG = {
    "C3": "C3.mp3", "Cs3": "Db3.mp3", "D3": "D3.mp3", "Ds3": "Eb3.mp3", "E3": "E3.mp3",
    "F3": "F3.mp3", "Fs3": "Gb3.mp3", "G3": "G3.mp3", "Gs3": "Ab3.mp3", "A3": "A3.mp3", "As3": "Bb3.mp3", "B3": "B3.mp3",
    "C4": "C4.mp3", "Cs4": "Db4.mp3", "D4": "D4.mp3", "Ds4": "Eb4.mp3", "E4": "E4.mp3",
    "F4": "F4.mp3", "Fs4": "Gb4.mp3", "G4": "G4.mp3", "Gs4": "Ab4.mp3", "A4": "A4.mp3", "As4": "Bb4.mp3", "B4": "B4.mp3",
    "C5": "C5.mp3", "Cs5": "Db5.mp3", "D5": "D5.mp3", "Ds5": "Eb5.mp3", "E5": "E5.mp3",
    "F5": "F5.mp3", "Fs5": "Gb5.mp3", "G5": "G5.mp3", "Gs5": "Ab5.mp3", "A5": "A5.mp3", "As5": "Bb5.mp3", "B5": "B5.mp3"
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OCTAVES = [3, 4, 5];

let VF = null;
const audioBuffers = {};
let isAudioLoaded = false;
let currentCorrectNote = ""; 
let isAnswered = false;       
let currentLevel = "1";
let currentQuestionNotes = []; // 현재 문제의 음정/화음 구성음들
let currentItem = null;
let userInputs = [];
// 퀴즈 화면 내에서 사용할 DOM 요소들
const el = {};

/* =========================================
   2. INITIALIZE & LOAD
   ========================================= */

/* IntervalQuiz.js */

/* IntervalQuiz.js */

export async function startIntervalQuiz(container, item, onBack) {
    currentItem = item;
    renderLayout(container, item); // 화면을 퀴즈 레이아웃으로 교체
    
    // ✅ 뒤로 가기 버튼에 main.js에서 받은 navigateToSub(category) 연결
    const backBtn = document.getElementById('quiz-back-btn');
    if (backBtn && onBack) {
        backBtn.onclick = (e) => {
            e.preventDefault();
            onBack(); // 실행 시 navigateToSub(category)가 작동함
        };
    }

    cacheElements();
    if (window.Vex && window.Vex.Flow) VF = window.Vex.Flow;
    if (!isAudioLoaded) await loadSamples();

    generateQuiz(currentItem);
}

function renderLayout(container, item) {
    container.innerHTML = `
        <div id="training-screen">
            <div class="top-bar">
                <button id="quiz-back-btn" class="back-btn">◀ 뒤로</button>
                <span id="quiz-title">${item.title}</span>
                <select id="level-select" style="margin-left: auto; padding: 5px; border-radius: 5px;">
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                </select>
            </div>
            <p id="quiz-instruction" style="text-align: center; margin: 15px 0; font-weight: bold; color: #555;"></p>
            <div id="output"></div>

            <div id="action-buttons" class="button-container"></div>

            <div id="piano-wrapper">
                <div id="piano-container"></div>
            </div>
            <div id="piano-navigator-wrapper">
                <div id="piano-navigator-container"></div>
                <div id="navigator-indicator"></div>
            </div>
        </div>
    `;
}

function cacheElements() {
    el.instruction = document.getElementById("quiz-instruction");
    el.actionButtons = document.getElementById("action-buttons");
    el.output = document.getElementById("output");
    el.levelSelect = document.getElementById("level-select");
    el.pianoContainer = document.getElementById("piano-container");
    el.pianoWrapper = document.getElementById("piano-wrapper");
    el.navContainer = document.getElementById('piano-navigator-container');
    el.navIndicator = document.getElementById('navigator-indicator');
    el.navWrapper = document.getElementById('piano-navigator-wrapper');

    el.levelSelect.onchange = (e) => {
        currentLevel = e.target.value;
        generateQuiz(currentItem);
    };
    el.output.onclick = () => playQuestion(currentItem.id);
}

async function loadSamples() {
    const entries = Object.entries(SAMPLES_CONFIG);
    await Promise.all(entries.map(([name, file]) => {
        return new Promise((resolve) => {
            const audio = new Audio(`./samples/${file}`);
            audio.preload = "auto";
            audio.oncanplaythrough = () => { audioBuffers[name] = { audio }; resolve(); };
            audio.onerror = resolve;
        });
    }));
    isAudioLoaded = true;
}

/* =========================================
   3. BUSINESS LOGIC (Service)
   ========================================= */

function handleUndo() {
    // 1. 판정이 끝났거나 입력값이 없으면 무시
    if (isAnswered || userInputs.length === 0) return;
    
    // 2. 마지막 입력 제거
    userInputs.pop();
    
    // 3. 악보 실시간 업데이트
    drawStave(userInputs);
    
    // ✅ [추가] 지운 후에도 버튼 UI(지우기 버튼 등)가 유지되도록 갱신
    renderActionButtons(false); 
    
    // 4. 햅틱 피드백
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: "HAPTIC", 
            result: "light" 
        }));
    }
}

function playNote(fullNote) {
    if (!isAudioLoaded) return;
    const [name, oct] = fullNote.split("/");
    const key = name.replace("#", "s") + oct;
    const sample = audioBuffers[key];
    if (sample) {
        sample.audio.currentTime = 0;
        sample.audio.play().catch(() => {});
    }
}


function getRandomNote() {
    let pool = (currentLevel === "1") ? ["C", "D", "E", "F", "G", "A", "B"] : NOTE_NAMES;
    const name = pool[Math.floor(Math.random() * pool.length)];
    const oct = (currentLevel === "3") ? OCTAVES[Math.floor(Math.random() * 3)] : 4;
    return `${name}/${oct}`;
}

function generateQuiz(item, preventAutoPlay = false) {
    if (!isAudioLoaded || !item) return;
    userInputs = []; // 새 문제 시작 시 입력 초기화

    const startNote = getRandomNote(); 
    const startIdx = NOTE_NAMES.indexOf(startNote.split('/')[0]);
    const startOct = parseInt(startNote.split('/')[1]);

    const rule = INTERVAL_MAP[item.id];
    
    if (typeof rule === 'number') {
        const secondNote = getNoteByOffset(startIdx, startOct, rule);
        currentQuestionNotes = [startNote, secondNote];
    } else if (Array.isArray(rule)) {
        currentQuestionNotes = rule.map(offset => getNoteByOffset(startIdx, startOct, offset));
    }

    currentCorrectNote = currentQuestionNotes[currentQuestionNotes.length - 1];
    isAnswered = false;
    el.instruction.innerHTML = `${item.title} 훈련 <br><small>들리는 음을 순서대로 모두 누르세요</small>`;
    
    drawStave([]); // 빈 배열로 시작
    renderPianoKeyboard();
    
    if (!preventAutoPlay) {
        setTimeout(() => playQuestion(item.id), 600); 
    }
}

function getNoteByOffset(startIdx, startOct, offset) {
    const total = startIdx + offset;
    const noteIdx = total % 12;
    const octShift = Math.floor(total / 12);
    return `${NOTE_NAMES[noteIdx]}/${startOct + octShift}`;
}

// 문제 재생 시 모든 음을 순차적 혹은 동시 재생
// 문제 재생 시 음정은 순차적으로, 화음은 동시에(아르페지오) 재생
function playQuestion(id) {
    const isChord = Array.isArray(INTERVAL_MAP[id]);
    const delay = isChord ? 100 : 500; // 화음이면 0.1초, 음정이면 0.5초 간격

    currentQuestionNotes.forEach((note, i) => {
        setTimeout(() => playNote(note), i * delay);
    });
}

/* =========================================
   4. UI RENDERING (View)
   ========================================= */

// src/views/quizzes/IntervalQuiz.js

function drawStave(inputNotes = [], results = []) {
    if (!VF || !el.output) return;
    el.output.innerHTML = "";
    
    const w = el.output.offsetWidth || 320;
    const renderer = new VF.Renderer(el.output, VF.Renderer.Backends.SVG);
    renderer.resize(w, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave((w - 260) / 2, 40, 260).addClef("treble");
    stave.setContext(context).draw();

    if (inputNotes.length === 0) return;

    try {
        const format = (n) => n.toLowerCase();
        
        const staveNotes = inputNotes.map((note, idx) => {
            const sn = new VF.StaveNote({ keys: [format(note)], duration: "q" });
            
            // 색상 결정 로직
            let color = "#333"; // 기본값 (입력 중)
            if (results.length > 0) {
                color = results[idx] ? "#28a745" : "#dc3545"; // 맞으면 초록, 틀리면 빨강
            }
            
            sn.setStyle({ fillStyle: color, strokeStyle: color });
            if (note.includes("#")) sn.addModifier(new VF.Accidental("#"), 0);
            return sn;
        });

        const voice = new VF.Voice({ num_beats: staveNotes.length, beat_value: 4 }).addTickables(staveNotes);
        new VF.Formatter().joinVoices([voice]).format([voice], 200);
        voice.draw(context, stave);
    } catch (e) { console.error(e); }
}

function renderPianoKeyboard() {
    el.pianoContainer.innerHTML = ""; 
    el.navContainer.innerHTML = "";

    const octaves = [3, 4, 5];
    const notes = [
        { n: "C", t: "white" }, { n: "C#", t: "black" }, { n: "D", t: "white" }, { n: "D#", t: "black" },
        { n: "E", t: "white" }, { n: "F", t: "white" }, { n: "F#", t: "black" }, { n: "G", t: "white" },
        { n: "G#", t: "black" }, { n: "A", t: "white" }, { n: "A#", t: "black" }, { n: "B", t: "white" }
    ];

    octaves.forEach(oct => {
        notes.forEach(note => {
            const full = `${note.n}/${oct}`;
            const key = document.createElement("div");
            key.className = note.t === "white" ? "white-key" : "black-key";
            
            key.onpointerdown = e => {
                e.preventDefault();
                playNote(full);
                key.classList.add("active");

                if (!isAnswered) {
                    userInputs.push(full);
                    drawStave(userInputs); 

                    // ✅ [추가] 음표를 입력할 때마다 버튼 영역을 다시 그려서 
                    // '지우기' 버튼 상태를 유지하거나 동기화합니다.
                    renderActionButtons(false);

                    if (userInputs.length === currentQuestionNotes.length) {
                        isAnswered = true;
                        
                        const results = userInputs.map((val, index) => val === currentQuestionNotes[index]);
                        const isAllCorrect = results.every(res => res === true);
                        
                        drawStave(userInputs, results); 
                        updateQuizResultUI(isAllCorrect);
                        sendHapticFeedback(isAllCorrect);

                        // ✅ [추가] 판정이 완료되었으므로 '다음 문제' 버튼이 나오도록 갱신합니다.
                        renderActionButtons(true);
                    }
                }
            };
            key.onpointerup = () => key.classList.remove("active");
            key.onpointerleave = () => key.classList.remove("active");
            el.pianoContainer.appendChild(key);

            const miniKey = document.createElement("div");
            miniKey.className = note.t === "white" ? "nav-white" : "nav-black";
            el.navContainer.appendChild(miniKey);
        });
    });

    setupSlider();
}

function setupSlider() {
    let isDragging = false;
    
    // ✅ 추가: 이전에 논의했던 보라색 인디케이터 minW 로직 적용
    // 3개 옥타브 기준, 화면에 약 1개 옥타브가 보이도록 설정 (33.3%)
    el.navIndicator.style.width = "33.333%"; 

    const moveIndicator = (clientX) => {
        const navRect = el.navContainer.getBoundingClientRect();
        const indicatorWidth = el.navIndicator.offsetWidth;
        const maxLeft = navRect.width - indicatorWidth;
        
        let x = clientX - navRect.left;
        let leftPos = Math.max(0, Math.min(x - (indicatorWidth / 2), maxLeft));
        
        el.navIndicator.style.left = (leftPos / navRect.width * 100) + "%";
        
        const scrollRatio = leftPos / maxLeft;
        const maxScroll = el.pianoContainer.scrollWidth - el.pianoWrapper.clientWidth;
        el.pianoWrapper.scrollLeft = scrollRatio * maxScroll;
    };

    el.navWrapper.onpointerdown = (e) => {
        isDragging = true;
        el.navWrapper.setPointerCapture(e.pointerId);
        moveIndicator(e.clientX);
    };

    window.onpointermove = (e) => { if (isDragging) moveIndicator(e.clientX); };
    window.onpointerup = (e) => { if (isDragging) isDragging = false; };
}

/* =========================================
   5. UTILS & BRIDGES
   ========================================= */

function updateQuizResultUI(isCorrect) {
    el.instruction.innerHTML = isCorrect ? 
        "<span style='color:#28a745;font-weight:bold'>정답 🎉</span>" : 
        "<span style='color:#dc3545;font-weight:bold'>오답 ❌</span>";
    renderActionButtons(true);
}

function renderActionButtons(isFinished = false) {
    const container = el.actionButtons;
    if (!container) return;
    
    container.innerHTML = "";
    // 버튼들이 가로로 나란히 배치되도록 설정
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.gap = "10px";

    if (!isFinished) {
        // [다시 듣기] 버튼
        container.appendChild(createBtn("다시 듣기 🔊", "main-btn", () => playQuestion(currentItem.id)));
        
        // [지우기] 버튼 생성 및 이벤트 연결
        const undoBtn = createBtn("지우기 ⌫", "main-btn", handleUndo);
        undoBtn.style.backgroundColor = "#f0ad4e"; 
        container.appendChild(undoBtn);
    } else {
        // 정답 이후 버튼들
        container.appendChild(createBtn("다시 풀기", "main-btn", () => {
            isAnswered = false;
            userInputs = [];
            drawStave([]);
            playQuestion(currentItem.id);
            renderActionButtons(false);
        }, "#6c757d"));
        container.appendChild(createBtn("다음 문제", "main-btn", () => generateQuiz(currentItem)));
    }
}

function createBtn(text, cls, clickFn, bg = "") {
    const b = document.createElement("button");
    b.className = cls; b.innerText = text;
    if (bg) b.style.backgroundColor = bg;
    b.onclick = clickFn;
    return b;
}

// 리액트 네이티브 진동 연동 함수
function sendHapticFeedback(isCorrect) {
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "HAPTIC",
            result: isCorrect ? "success" : "error"
        }));
    }
}

