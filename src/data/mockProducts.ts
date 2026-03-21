const mockProducts = [
  { id: '1', nameTh: 'เสื้อคลุมผ้าหมักโคลน ลายพู่ดอกฝ้าย', nameEn: 'Phu Dokfai Mudcloth Jacket', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 2000, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '2', nameTh: 'เสื้อสุภาพสตรี', nameEn: "Women's Shirt", province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 500, category: 'ผ้า', imageCover: '', ratingsAverage: 3 },

  { id: '3', nameTh: 'ผ้าพันคอ ขนาด 200x35 ซม.', nameEn: 'Scarf', province: 'บึงกาฬ', amphure: 'เซกา', price: 350, category: 'ผ้า', imageCover: '', ratingsAverage: 5 },

  { id: '4', nameTh: 'เสื้อลายศรัทธานาคา', nameEn: 'Sattha Naka Shirt', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 1600, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '5', nameTh: 'เดรส', nameEn: 'Dress', province: 'บึงกาฬ', amphure: 'พรเจริญ', price: 1500, category: 'ผ้า', imageCover: '', ratingsAverage: 2 },

  { id: '6', nameTh: 'ผ้าทอมือลายปลาคาบของ', nameEn: 'Pla Karb Khong Hand Woven Fabric', province: 'บึงกาฬ', amphure: 'เซกา', price: 800, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '7', nameTh: 'ผ้าสไบบึงกาฬสีม่วง', nameEn: 'The purple breast cloth', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 350, category: 'ผ้า', imageCover: '', ratingsAverage: 3 },

  { id: '8', nameTh: 'ชาสิรินธรวัลลี', nameEn: 'Sirindhorn Wanli Tea', province: 'บึงกาฬ', amphure: 'บุ่งคล้า', price: 150, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '9', nameTh: 'สบู่สมุนไพรจากต้นสิรินธรวัลลี', nameEn: 'Sirindhorn Wanli Herbal Soap', province: 'บึงกาฬ', amphure: 'บุ่งคล้า', price: 50, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '10', nameTh: 'เมล็ดกาแฟโรบัสต้า (500 กรัม)', nameEn: 'Coffee Beans (500 g)', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 179, category: 'อาหาร', imageCover: '', ratingsAverage: 3 },

  { id: '11', nameTh: 'ข้าวแต๋นน้ำแตงโม', nameEn: 'Rice Crackers with Watermelon Juice', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 35, category: 'อาหาร', imageCover: '', ratingsAverage: 4 },

  { id: '13', nameTh: 'น้ำจิ้มหมูกระทะชาบู', nameEn: 'BBQ Dip Sauce', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 39, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '14', nameTh: 'พวงกุญแจปลามงคล', nameEn: 'Auspicious Fish Keychain', province: 'บึงกาฬ', amphure: 'หอคำ', price: 159, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '15', nameTh: 'กระเป๋าสาน', nameEn: 'Woven Bag', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 3600, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '16', nameTh: 'กระเป๋าสุภาพสตรี', nameEn: "Women's Handbag", province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 299, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 3 },

  { id: '17', nameTh: 'กระเป๋าสาน', nameEn: 'Woven Bag', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 600, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '18', nameTh: 'เข็มขัดหนังจระเข้', nameEn: 'Belt', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 950, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '19', nameTh: 'กล้วยผง', nameEn: 'Banana Powder', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 150, category: 'อาหาร', imageCover: '', ratingsAverage: 3 },

  { id: '20', nameTh: 'ถั่วคั่วทราย', nameEn: 'Sand-Roasted Peanuts', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 35, category: 'อาหาร', imageCover: '', ratingsAverage: 3 },

  { id: '21', nameTh: 'พิมเสนน้ำ', nameEn: 'Borneol', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 35, category: 'เบ็ดเตล็ด', imageCover: '', ratingsAverage: 3 },

  { id: '22', nameTh: 'กระเป๋าสตางค์', nameEn: 'Wallet', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 550, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '23', nameTh: 'ถาดสาน Size S', nameEn: 'Woven tray size S', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 250, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '24', nameTh: 'ถาดสาน Size L', nameEn: 'Woven tray size L', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 350, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '25', nameTh: 'พวงกุญแจ', nameEn: 'Keychain', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 100, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 },

  { id: '26', nameTh: 'เสื้อผ้าฝ้ายเข็นมือลายโขงนที', nameEn: 'Khong Natee Hand Woben Cotton', province: 'บึงกาฬ', amphure: 'หอคำ', price: 950, category: 'ผ้า', imageCover: '', ratingsAverage: 5 },

  { id: '27', nameTh: 'พวงกุญแจควาย', nameEn: 'Buffalo keychain', province: 'บึงกาฬ', amphure: 'หอคำ', price: 159, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '28', nameTh: 'กระเป๋าผ้าทอมือ', nameEn: 'Handmade woven bag', province: 'บึงกาฬ', amphure: 'หอคำ', price: 250, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '29', nameTh: 'กระเป๋าสุภาพสตรี', nameEn: "Women's handbag", province: 'บึงกาฬ', amphure: 'ปากคาด', price: 2500, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 },

  { id: '30', nameTh: 'กล้วยอบ (500 กรัม)', nameEn: 'Baked banana (500 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '31', nameTh: 'กล้วยสติ๊กไม่โรยงา (500 กรัม)', nameEn: 'Dried banana sticks (non sesame) (500 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '32', nameTh: 'กล้วยสติ๊กโรยงา (400 กรัม)', nameEn: 'Dried banana sticks with sesame (400 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '33', nameTh: 'ข้าวมะลิแดง (1 กิโลกรัม)', nameEn: 'Red hom mali rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 49, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '34', nameTh: 'ข้าวไรซ์เบอร์รี่ (1 กิโลกรัม)', nameEn: 'Riceberry rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 79, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '35', nameTh: 'ข้าวสามสี (1 กิโลกรัม)', nameEn: 'Three color rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 79, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '36', nameTh: 'ข้าวฮาง (1 กิโลกรัม)', nameEn: 'Hang rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 89, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '37', nameTh: 'ข้าวงอก (1 กิโลกรัม)', nameEn: 'Germinated brown rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 99, category: 'อาหาร', imageCover: '', ratingsAverage: 5 },

  { id: '38', nameTh: 'ผ้าทอลายพู่ดอกฝ้าย (หน้ากว้าง 1 เมตร)', nameEn: 'Phu Dokfai woven fabric', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 500, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '39', nameTh: 'เสื้อแขนสั้นคอกลม ลายชลดา', nameEn: 'Chonlada short sleeve t-shirt', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 1400, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '40', nameTh: 'ผ้าทอมือ ลายตุงรุ่งเรืองเมืองภูไท แบบที่ 1', nameEn: 'Type 1 tung rung ruang muang phu thai hand woven fabric', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 700, category: 'ผ้า', imageCover: '', ratingsAverage: 4 },

  { id: '41', nameTh: 'ผ้าทอมือ ลายตุงรุ่งเรืองเมืองภูไท แบบที่ 2', nameEn: 'Type 2 tung rung ruang muang phu thai hand woven fabric', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 700, category: 'ผ้า', imageCover: '', ratingsAverage: 4 }
];

export default mockProducts;