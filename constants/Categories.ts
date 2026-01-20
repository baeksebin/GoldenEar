export interface LevelDetail {
  id: string;
  title: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  levels?: SubCategory[]; 
  details?: LevelDetail[]; 
}

export interface CategoryItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: SubCategory[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'ear',
    title: '청음 훈련',
    icon: '🎧',
    color: '#4CAF50',
    description: '음정, 화음, 스케일 듣기',
    items: [
      { 
        id: 'intervals', 
        title: '음정', 
        levels: [
          { 
            id: 'major_minor', 
            title: '장/단음정', 
            details: [
              { id: 'm2', title: '단 2도' }, { id: 'M2', title: '장 2도' },
              { id: 'm3', title: '단 3도' }, { id: 'M3', title: '장 3도' },
              { id: 'm6', title: '단 6도' }, { id: 'M6', title: '장 6도' },
              { id: 'm7', title: '단 7도' }, { id: 'M7', title: '장 7도' },
            ]
          },
          { 
            id: 'perfect', 
            title: '완전음정', 
            details: [
              { id: 'P1', title: '완전 1도' }, { id: 'P4', title: '완전 4도' },
              { id: 'P5', title: '완전 5도' }, { id: 'P8', title: '완전 8도' },
            ]
          },
          { 
            id: 'aug_dim', 
            title: '증/감음정', 
            details: [
              { id: 'aug4', title: '증 4도' }, { id: 'dim5', title: '감 5도' },
            ]
          }
        ]
      },
      { 
        id: 'chords', 
        title: '화음', 
        levels: [
          { 
            id: 'triad', 
            title: '3화음', 
            details: [
              { id: 'major', title: 'Major' }, { id: 'minor', title: 'Minor' },
              { id: 'aug', title: 'Augmented' }, { id: 'dim', title: 'Diminished' },
            ]
          },
          { 
            id: 'seventh', 
            title: '7화음', 
            details: [
              { id: 'maj7', title: 'Maj7' }, { id: 'dom7', title: '7 (Dominant)' },
              { id: 'min7', title: 'm7' }, { id: 'm7b5', title: 'm7(b5)' },
              { id: 'dim7', title: 'dim7' },
            ]
          },
          { id: 'tension', title: '텐션', details: [{ id: 't9', title: '9' }, { id: 't11', title: '11' }, { id: 't13', title: '13' }] },
          { id: 'inversion', title: '전위', details: [{ id: 'inv1', title: '1차 전위' }, { id: 'inv2', title: '2차 전위' }] }
        ]
      },
      { 
        id: 'scales', 
        title: '스케일', 
        levels: [
          { id: 'basic', title: '기본 스케일', details: [{ id: 'ionian', title: 'Ionian' }, { id: 'aeolian', title: 'Aeolian' }] },
          { id: 'pentatonic', title: '펜타토닉', details: [{ id: 'm_penta', title: '마이너 펜타' }, { id: 'M_penta', title: '메이저 펜타' }] },
          { id: 'modes', title: '모드 스케일', details: [{ id: 'dorian', title: 'Dorian' }, { id: 'phrygian', title: 'Phrygian' }, { id: 'lydian', title: 'Lydian' }, { id: 'mixolydian', title: 'Mixolydian' }, { id: 'locrian', title: 'Locrian' }] }
        ]
      }
    ]
  },
  {
    id: 'rhythm',
    title: '리듬 훈련',
    icon: '🥁',
    color: '#FF9800',
    description: '박자 및 리듬 패턴 연습',
    items: [
      { id: 'input', title: '리듬 인풋', description: '들리는 리듬 입력' },
      { id: 'tap', title: '리듬 탭', description: '리듬에 맞춰 탭' },
    ]
  }
];