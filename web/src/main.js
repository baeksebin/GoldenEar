import './css/category.css';
import './css/common.css';
import './css/piano.css';
import { CATEGORIES } from './data/categories.js';
import { renderSubCategory } from './views/CategoryView.js';
// 퀴즈 실행 함수 임포트
import { startIntervalQuiz } from './views/quizzes/IntervalQuiz.js';

const app = document.getElementById('app');

/**
 * 훈련 탭의 메인 화면: 대분류 카드 리스트를 그림
 */
function renderTrainingMain() {
    app.innerHTML = `<div class="grid-container"></div>`;

    const grid = app.querySelector('.grid-container');

    CATEGORIES.forEach(category => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 8px;">${category.icon}</div>
            <div>${category.title}</div>
        `;
        
        card.onclick = () => {
            console.log(`${category.title} 선택됨`);
            navigateToSub(category);
        };
        grid.appendChild(card);
    });
}

/**
 * 서브 카테고리 이동 (재귀적 카드 or 아코디언)
 */
// parent 인자를 추가하여 이전 단계를 기억하게 합니다.
function navigateToSub(category, parent = null) {
    if (category.items && category.items.length > 0) {
        // 1. 대분류 리스트 화면 (음정, 화음, 스케일 선택)
        app.innerHTML = `
            <div id="training-screen">
                <div class="top-bar">
                    <button id="btn-back" class="back-btn">◀ 뒤로</button>
                    <span id="current-title">${category.title}</span>
                </div>
                <div class="grid-container"></div> 
            </div>
        `;

        const grid = app.querySelector('.grid-container');
        category.items.forEach(subItem => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `<div>${subItem.title}</div>`;
            // 다음 단계로 갈 때 현재 category를 부모(parent)로 전달
            card.onclick = () => navigateToSub(subItem, category); 
            grid.appendChild(card);
        });

        // 여기서 뒤로가기는 진짜 홈(청음/리듬 선택)으로 이동
        document.getElementById('btn-back').onclick = () => renderTrainingMain();
    } 
    else {
        // 2. 아코디언 화면 (장단음정, 완전음정 등 리스트)
        app.innerHTML = `
            <div id="training-screen">
                <div class="top-bar">
                    <button id="btn-back" class="back-btn">◀ 뒤로</button>
                    <span id="current-title">${category.title}</span>
                </div>
                <div id="output"></div> 
            </div>
        `;

        // ✅ [수정 핵심] 아코디언 화면에서 뒤로가기 시 
        // 부모가 있다면 부모 화면(음정/화음 선택)으로, 없으면 홈으로 이동
        document.getElementById('btn-back').onclick = () => {
            if (parent) {
                navigateToSub(parent); // '음정' 화면으로 돌아감
            } else {
                renderTrainingMain();
            }
        };

        renderSubCategory(document.getElementById('output'), category, (finalItem) => {
            // 퀴즈 화면 진입
            startIntervalQuiz(app, finalItem, () => {
                // 퀴즈에서 뒤로가면 다시 현재 아코디언 화면으로
                navigateToSub(category, parent); 
            });
        });
    }
}

// 최초 실행
renderTrainingMain();