// src/views/CategoryView.js

export function renderSubCategory(container, data, onNavigate) {
    container.innerHTML = ''; 

    // 데이터 구조 디버깅용 (콘솔에서 확인해보세요)
    console.log("받은 데이터:", data);

    // 1단계: 하위 리스트(levels 또는 items 또는 details) 추출
    const list = data.levels || data.items || data.details || [];

    if (list.length === 0) {
        container.innerHTML = '<div style="padding:20px;">데이터가 없습니다.</div>';
        return;
    }

    list.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'chapter-wrapper';

        // 챕터 헤더 생성
        const header = document.createElement('div');
        header.className = 'chapter-header';
        header.innerHTML = `
            <div>
                <span style="font-size: 12px; color: #666;">Chapter ${index + 1}</span>
                <div style="font-weight: bold; font-size: 18px;">${item.title}</div>
            </div>
            <div class="progress-circle">0%</div>
        `;

        // 아코디언 내용물 (세부 퀴즈 항목들)
        const content = document.createElement('div');
        content.className = 'chapter-content';
        
        // 2단계: 더 하위 데이터(details)가 있는지 확인
        const subItems = item.details || item.levels || [];
        
        subItems.forEach(subItem => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            detailItem.style.padding = '15px 20px';
            detailItem.style.borderBottom = '1px solid #f0f0f0';
            detailItem.innerText = subItem.title;
            
            detailItem.onclick = (e) => {
                e.stopPropagation(); 
                onNavigate(subItem); 
            };
            content.appendChild(detailItem);
        });

        // 클릭 시 열고 닫기 로직
        header.onclick = () => {
            // 모든 챕터를 닫고 현재 것만 열고 싶다면 여기서 초기화 로직 추가 가능
            content.classList.toggle('active');
        };

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        container.appendChild(wrapper);
    });
}
