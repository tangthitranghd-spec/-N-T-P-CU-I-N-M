export type QuestionType = 'mcq' | 'short-answer' | 'true-false' | 'fill-blank';

export interface Question {
  id: number;
  type: QuestionType;
  level: 'easy' | 'medium' | 'hard';
  topic: string;
  question: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  image?: string;
}

export const questions: Question[] = [
  // --- EASY (10 questions) ---
  {
    id: 1,
    type: 'mcq',
    level: 'easy',
    topic: 'Số học',
    question: 'Trong các số thập phân sau, số nào lớn nhất?',
    options: ['12,5', '12,05', '12,501', '12,499'],
    answer: '12,501',
    explanation: 'So sánh phần nguyên (đều là 12), sau đó so sánh phần mười (5 = 5 > 0 = 4), tiếp tục so sánh phần trăm và phần nghìn.'
  },
  {
    id: 2,
    type: 'mcq',
    level: 'easy',
    topic: 'Số học',
    question: 'Làm tròn số thập phân 15,738 đến hàng phần mười ta được:',
    options: ['15,7', '15,8', '15,74', '16,0'],
    answer: '15,7',
    explanation: 'Chữ số hàng phần trăm là 3 (< 5) nên ta giữ nguyên chữ số hàng phần mười và bỏ các chữ số sau đó.'
  },
  {
    id: 3,
    type: 'short-answer',
    level: 'easy',
    topic: 'Đại lượng',
    question: 'Đổi 1,25 kg sang gam (g).',
    answer: '1250',
    explanation: '1 kg = 1000 g. Vậy 1,25 kg = 1,25 x 1000 = 1250 g.'
  },
  {
    id: 4,
    type: 'mcq',
    level: 'easy',
    topic: 'Đại lượng',
    question: 'Đổi 2,5 m² sang dm².',
    options: ['25 dm²', '250 dm²', '2500 dm²', '0,25 dm²'],
    answer: '250 dm²',
    explanation: '1 m² = 100 dm². Vậy 2,5 m² = 2,5 x 100 = 250 dm².'
  },
  {
    id: 5,
    type: 'true-false',
    level: 'easy',
    topic: 'Xác suất',
    question: 'Khi tung một đồng xu, sự kiện "Mặt ngửa xuất hiện" là chắc chắn xảy ra.',
    answer: 'Sai',
    explanation: 'Sự kiện này chỉ là "có thể" xảy ra, vì cũng có thể xuất hiện mặt sấp.'
  },
  {
    id: 6,
    type: 'mcq',
    level: 'easy',
    topic: 'Giải toán',
    question: '25% của 80 là bao nhiêu?',
    options: ['20', '25', '30', '40'],
    answer: '20',
    explanation: '80 x 25 / 100 = 20.'
  },
  {
    id: 7,
    type: 'short-answer',
    level: 'easy',
    topic: 'Số học',
    question: 'Tính: 2 giờ 30 phút + 1 giờ 15 phút = ... giờ ... phút (Nhập kết quả dạng: X giờ Y phút)',
    answer: '3 giờ 45 phút',
    explanation: 'Cộng giờ với giờ, phút với phút: (2+1) giờ (30+15) phút = 3 giờ 45 phút.'
  },
  {
    id: 8,
    type: 'mcq',
    level: 'easy',
    topic: 'Đại lượng',
    question: '1,5 giờ bằng bao nhiêu phút?',
    options: ['75 phút', '90 phút', '100 phút', '150 phút'],
    answer: '90 phút',
    explanation: '1 giờ = 60 phút. Vậy 1,5 giờ = 1,5 x 60 = 90 phút.'
  },
  {
    id: 9,
    type: 'fill-blank',
    level: 'easy',
    topic: 'Số học',
    question: 'Kết quả của phép tính 12,6 : 3 là: ___',
    answer: '4,2',
    explanation: '12,6 chia cho 3 bằng 4,2.'
  },
  {
    id: 10,
    type: 'mcq',
    level: 'easy',
    topic: 'Biểu đồ',
    question: 'Trong một túi có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ngẫu nhiên 1 quả. Khả năng lấy được bóng vàng là:',
    options: ['Có thể', 'Chắc chắn', 'Không thể'],
    answer: 'Không thể',
    explanation: 'Trong túi không có bóng vàng nên không thể lấy được.'
  },

  // --- MEDIUM (10 questions) ---
  {
    id: 11,
    type: 'short-answer',
    level: 'medium',
    topic: 'Số học',
    question: 'Tính giá trị biểu thức: 100 - 12,34',
    answer: '87,66',
    explanation: 'Đặt tính: 100,00 - 12,34 = 87,66.'
  },
  {
    id: 12,
    type: 'mcq',
    level: 'medium',
    topic: 'Số học',
    question: 'Làm tròn số 123,456 đến hàng phần trăm ta được:',
    options: ['123,45', '123,46', '123,5', '123,4'],
    answer: '123,46',
    explanation: 'Chữ số hàng phần nghìn là 6 (>= 5) nên ta tăng chữ số hàng phần trăm lên 1 đơn vị.'
  },
  {
    id: 13,
    type: 'short-answer',
    level: 'medium',
    topic: 'Số học',
    question: 'Tính: (2/3) x (9/4) (Nhập kết quả dưới dạng phân số tối giản a/b)',
    answer: '3/2',
    explanation: '(2 x 9) / (3 x 4) = 18 / 12 = 3/2.'
  },
  {
    id: 14,
    type: 'mcq',
    level: 'medium',
    topic: 'Giải toán',
    question: 'Một ô tô đi với vận tốc 60 km/giờ trong 2,5 giờ. Quãng đường ô tô đi được là:',
    options: ['120 km', '150 km', '180 km', '140 km'],
    answer: '150 km',
    explanation: 'Quãng đường = Vận tốc x Thời gian = 60 x 2,5 = 150 km.'
  },
  {
    id: 15,
    type: 'short-answer',
    level: 'medium',
    topic: 'Thống kê',
    question: 'Tung đồng xu 20 lần, thấy có 12 lần mặt sấp. Tỉ số số lần mặt sấp trên tổng số lần tung là: (Nhập dạng phân số tối giản a/b)',
    answer: '3/5',
    explanation: 'Tỉ số là 12/20 = 3/5.'
  },
  {
    id: 16,
    type: 'mcq',
    level: 'medium',
    topic: 'Biểu đồ',
    question: 'Biểu đồ cho biết: Lớp 5A có 20 học sinh giỏi, lớp 5B có 25 học sinh giỏi. Số học sinh giỏi lớp 5A bằng bao nhiêu phần trăm lớp 5B?',
    options: ['80%', '125%', '45%', '20%'],
    answer: '80%',
    explanation: 'Tỉ số phần trăm: 20 : 25 = 0,8 = 80%.'
  },
  {
    id: 17,
    type: 'short-answer',
    level: 'medium',
    topic: 'Số học',
    question: 'Tính: 3 giờ 45 phút x 2 = ... giờ ... phút',
    answer: '7 giờ 30 phút',
    explanation: '3 giờ x 2 = 6 giờ; 45 phút x 2 = 90 phút = 1 giờ 30 phút. Tổng cộng là 7 giờ 30 phút.'
  },
  {
    id: 18,
    type: 'mcq',
    level: 'medium',
    topic: 'Đại lượng',
    question: 'Đổi 0,75 tấn sang kg.',
    options: ['75 kg', '750 kg', '7500 kg', '7,5 kg'],
    answer: '750 kg',
    explanation: '1 tấn = 1000 kg. Vậy 0,75 tấn = 0,75 x 1000 = 750 kg.'
  },
  {
    id: 19,
    type: 'true-false',
    level: 'medium',
    topic: 'Số học',
    question: 'Phép tính 0,5 x 0,5 có kết quả là 2,5.',
    answer: 'Sai',
    explanation: '0,5 x 0,5 = 0,25.'
  },
  {
    id: 20,
    type: 'fill-blank',
    level: 'medium',
    topic: 'Hình học',
    question: 'Diện tích hình vuông có cạnh 5cm là: ___ cm²',
    answer: '25',
    explanation: 'Diện tích = cạnh x cạnh = 5 x 5 = 25 cm².'
  },

  // --- HARD (10 questions) ---
  {
    id: 21,
    type: 'short-answer',
    level: 'hard',
    topic: 'Số học',
    question: 'Tính: 12,5 : 0,25 + 7,5 x 4',
    answer: '80',
    explanation: '12,5 : 0,25 = 50; 7,5 x 4 = 30. Tổng là 50 + 30 = 80.'
  },
  {
    id: 22,
    type: 'mcq',
    level: 'hard',
    topic: 'Giải toán',
    question: 'Một người đi xe máy từ A lúc 7 giờ 15 phút và đến B lúc 9 giờ 45 phút. Giữa đường người đó nghỉ 15 phút. Vận tốc xe máy là 40 km/giờ. Quãng đường AB là:',
    options: ['100 km', '90 km', '80 km', '110 km'],
    answer: '90 km',
    explanation: 'Thời gian đi thực tế: 9h45 - 7h15 - 15p = 2h15p = 2,25 giờ. Quãng đường = 40 x 2,25 = 90 km.'
  },
  {
    id: 23,
    type: 'short-answer',
    level: 'hard',
    topic: 'Hình học',
    question: 'Một hình chữ nhật có chiều dài 10cm, chiều rộng 6cm. Bên trong có một hình tròn bán kính 2cm. Tính diện tích phần còn lại của hình chữ nhật (Lấy pi = 3,14).',
    answer: '47,44',
    explanation: 'S_hcn = 10 x 6 = 60. S_tron = 2 x 2 x 3,14 = 12,56. S_con_lai = 60 - 12,56 = 47,44 cm².'
  },
  {
    id: 24,
    type: 'mcq',
    level: 'hard',
    topic: 'Số học',
    question: 'Tính nhanh: (1/2) x (2/3) x (3/4) x (4/5)',
    options: ['1/5', '1/4', '4/5', '1/2'],
    answer: '1/5',
    explanation: 'Khử các số giống nhau ở tử và mẫu, còn lại 1 ở tử và 5 ở mẫu.'
  },
  {
    id: 25,
    type: 'short-answer',
    level: 'hard',
    topic: 'Biểu đồ',
    question: 'Tổng số học sinh khối 5 là 200 em. Biểu đồ hình quạt cho thấy số học sinh thích bơi lội chiếm 30%. Tính số học sinh thích bơi lội.',
    answer: '60',
    explanation: '200 x 30 / 100 = 60 học sinh.'
  },
  {
    id: 26,
    type: 'mcq',
    level: 'hard',
    topic: 'Số học',
    question: 'Kết quả của phép tính: 5 giờ 20 phút : 4 là:',
    options: ['1 giờ 20 phút', '1 giờ 15 phút', '1 giờ 30 phút', '1 giờ 5 phút'],
    answer: '1 giờ 20 phút',
    explanation: '5 giờ : 4 = 1 giờ dư 1 giờ (60 phút). 60 phút + 20 phút = 80 phút. 80 phút : 4 = 20 phút. Vậy kết quả là 1 giờ 20 phút.'
  },
  {
    id: 27,
    type: 'fill-blank',
    level: 'hard',
    topic: 'Đại lượng',
    question: 'Đổi 1,5 ha sang m²: ___ m²',
    answer: '15000',
    explanation: '1 ha = 10000 m². Vậy 1,5 ha = 1,5 x 10000 = 15000 m².'
  },
  {
    id: 28,
    type: 'true-false',
    level: 'hard',
    topic: 'Giải toán',
    question: 'Nếu vận tốc tăng gấp đôi và thời gian giảm một nửa thì quãng đường không đổi.',
    answer: 'Đúng',
    explanation: 's = v x t. Nếu v\' = 2v và t\' = t/2 thì s\' = 2v x t/2 = v x t = s.'
  },
  {
    id: 29,
    type: 'mcq',
    level: 'hard',
    topic: 'Xác suất',
    question: 'Gieo một con xúc xắc 6 mặt. Khả năng xuất hiện mặt có số chấm chia hết cho 7 là:',
    options: ['Có thể', 'Chắc chắn', 'Không thể'],
    answer: 'Không thể',
    explanation: 'Các mặt xúc xắc chỉ có từ 1 đến 6 chấm, không có số nào chia hết cho 7.'
  },
  {
    id: 30,
    type: 'short-answer',
    level: 'hard',
    topic: 'Số học',
    question: 'Tìm x biết: x + 12,5 = 30,7 - 5,2',
    answer: '13',
    explanation: 'x + 12,5 = 25,5 => x = 25,5 - 12,5 = 13.'
  }
];
