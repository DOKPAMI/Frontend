// const imageURL = (imageName: string) =>
//   `https://firebasestorage.googleapis.com/v0/b/dokpami2.firebasestorage.app/o/${imageName}?alt=media&token=6421894c-8067-4ede-8b45-be72d40c9214`;
export const BalanceGameResults: Record<
  string,
  {
    id: number;
    title: string;
    subtitle: string;
    imageURL: string;
    content: string;
    keywords: string[];
  }
> = {
  hardworking: {
    id: 1,
    title: '갓생팜희',
    subtitle: '"오늘도 성장! 갓생은 나의 길!"',
    imageURL: '/characters/images/char3.png',
    content: `나는 하루를 알차게 살아야 직성이 풀려!...`,
    keywords: ['자기계발', '루틴', '도서관', '운동'],
  },

  yolo: {
    id: 2,
    title: '욜로팜희',
    subtitle: '"청춘은 지금뿐! 즐길 수 있을 때 즐겨야지!"',
    imageURL: '/characters/images/char5.png',
    content: `대학 생활을 후회 없이 즐기고 싶어...`,
    keywords: ['여행러', '경험추구', '즉흥적', '축제마니아'],
  },

  leader: {
    id: 3,
    title: '리더팜희',
    subtitle: '"리더십은 나의 힘! 책임감이 곧 경쟁력!"',
    imageURL: '/characters/images/char4.png',
    content: `나는 언제 어디서든 리더로서 앞장서는 타입이야...`,
    keywords: ['조장', '학생회', '리더십', '주도적'],
  },

  home: {
    id: 4,
    title: '집순팜희',
    subtitle: '"혼자가 제일 편해! 나만의 시간이 소중해!"',
    imageURL: '/characters/images/char2.png',
    content: `나는 혼자 있는 시간이 가장 행복해!...`,
    keywords: ['혼자시간', '집콕', '넷플릭스', '조용함'],
  },

  study: {
    id: 5,
    title: '열공팜희',
    subtitle: '"성적은 배신하지 않는다! 도서관이 내 집!"',
    imageURL: '/characters/images/char8.png',
    content: `대학은 학습을 위한 장소!...`,
    keywords: ['도서관', '시험공부', '자기주도', '계획형'],
  },

  sociable: {
    id: 6,
    title: '인싸팜희',
    subtitle: '"사람들과 어울리는 게 제일 좋아!"',
    imageURL: '/characters/images/char7.png',
    content: `나는 사람들과 어울리는 게 가장 즐거운 대학생활이야!...`,
    keywords: ['네트워킹', '동아리', '모임선호', '외향적'],
  },

  njob: {
    id: 7,
    title: 'N잡팜희',
    subtitle: '"대학생활도 현실적이어야지! 경제력이 중요해!"',
    imageURL: '/characters/images/char6.png',
    content: `나는 학업도 중요하지만, 경제적 독립이 더 중요해!...`,
    keywords: ['알바', '인턴', '공모전', '경제독립'],
  },

  love: {
    id: 8,
    title: '연애팜희',
    subtitle: '"애인과 함께하는 시간이 제일 소중해!"',
    imageURL: '/characters/images/char1.png',
    content: `나는 연애를 하면서 함께 성장하는 게 대학생활의 가장 큰 행복이야!...`,
    keywords: ['데이트', '사랑꾼', '감성적', '연애우선'],
  },
};
