const mockProducts = [
  { id: '1', nameTh: 'เสื้อคลุมผ้าหมักโคลน ลายพู่ดอกฝ้าย', nameEn: 'Phu Dokfai Mudcloth Jacket', province: 'สมุทรปราการ', amphure: 'เมืองบึงกาฬ', price: 2000, category: 'ผ้า', imageCover: '', ratingsAverage: 4, contact: '0956647134', description: 'กลุ่มทอผ้าพื้นเมืองบ้านสะง้อ คุณแม่สมพรนำภูมิปัญญาตั้งเดิมสมัยก่อน โดยนำโคลนนาคีซึ่งอยู่ใน จุดที่เกิดยั้งไฟพญานาค นำมาหมักเส้นฝ้าย ก่อนจะระทอเป็นผ้าโคสนนาดี คุณสมบัติ ช่วยให้ผ้านุ่ม สีเด่นชัด ซึ่งกระบวนการหมักโคลนจะต้องย้อมตีผ้ายก่อนด้วย สีธรรมชาติ เช่น หมากค้อได้สีเขียว, สีชมพูได้จากมะเหมี่ยวราชพฤกษ์, โคลนให้สีน้ำตาลอ่อน, สีเทา ได้จากปูนกินหมาก จากนั้นก็น่าด้ายที่ยังมสี มาหมักโคลน แล้วนำมาทอเป็นผืน'},

  { id: '2', nameTh: 'เสื้อสุภาพสตรี', nameEn: "Women's Shirt", province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 500, category: 'ผ้า', imageCover: '', ratingsAverage: 3 , contact: '0951964679' , description: 'กลุ่มประดิษฐ์ผ้าฝ้ายทอมือฝ้ายเทพใช้ผ้าขาวม้าดีไชน์สวยของทางกลุ่มมาตัดเย็นเป็นเสื้อสำเร็จทั้งเสื้อผู้ชายและผู้หญิงนอกจากนี้ยังมีกระเป้าที่ตัดเย็บและออกแบบให้ดูสวยร่วยร่วมสมัย' },

  { id: '3', nameTh: 'ผ้าพันคอ ขนาด 200x35 ซม.', nameEn: 'Scarf', province: 'บึงกาฬ', amphure: 'เซกา', price: 350, category: 'ผ้า', imageCover: '', ratingsAverage: 5 , contact: '0611216466' , description: 'วิสาหกิจชุมชนทอผ้าย้อมคราม บ้านดงสาร เริ่มต้นจากการทอไว้ใช้เองในครัวเรือน จากนั้นปี พ.ศ. 2554 มีหน่วยงานพัฒนาชุมชนจังหวัดบึงกาฬเห็นฝีมือ และความสวยงามของผืนผ้าทอจึงเข้ามาสนับสนุนนำผลิตภัณฑ์ไปตัดตรรดาว OTOP มีการรวมกลุ่มในชื่อกลุ่มทอผ้าย้อมครามบ้านดงสารเป็นต้นมา' },

  { id: '4', nameTh: 'เสื้อลายศรัทธานาคา', nameEn: 'Sattha Naka Shirt', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 1600, category: 'ผ้า', imageCover: '', ratingsAverage: 4 , contact: '0909249032' , description: 'กลุ่มทอผ้าพื้นเมืองสาวภูไท บ้านถ้ำเจริญ เดิมทีแต่ละบ้านมีการทอผ้าเลยมารวมตัวกันตั้งกลุ่มทอผ้าเมื่อก่อนใช้สีเคมีแต่พอรวมตัวเป็นกลุ่มแล้วเลยเปลี่ยนเป็นการย้อมสีธรรมชาติทั้งหมดใช้ครามย้อมเป็นหลักลายที่เป็นเอกลักษณ์ของตัวเอง"ลายตุงรุ่งเมืองภูไท"ย้อมประดู่ก่อนแล้วมัดหมี่' },

  { id: '5', nameTh: 'เดรส', nameEn: 'Dress', province: 'บึงกาฬ', amphure: 'พรเจริญ', price: 1500, category: 'ผ้า', imageCover: '', ratingsAverage: 2 , contact: '0890535975' , description: 'กลุ่มแปรรูปผลิตภัณฑ์จากผ้าพื้นเมือง บ้านศรีวิชัย เริ่มต้นจากเด็กผู้หญิงที่มีความรักในการทอผ้าเรียนรู้และจดจำมาจากรุ่นบรรพบุรุษทำให้มีวิชาความรู้เรื่องการพอผ้าติดตัวมาต่อมาเริ่มนำกลุ่มทอผ้าเข้าสู่OTOPของจังหวัดถึงกาฬเพื่อให้ผู้สูงอายุมีรายได้มากขึ้นการใช้สีธรรมชาติในการย้อมฝ้ายทำให้แตกต่างจากผ้าทอมือทั่วไปปัจจุบันมีการนำเส้นใยไปหมักโคลนบึงกาฬก่อนนำมาทอเป็นผ้าทำให้ได้ผักที่มีความนุ่มทอมไอดินกลิ่นโคลนมีเอกลักษณ์เฉพาะตัว เป็นของดีของเด่นจังหวัดบึงกาฬ' },

  { id: '6', nameTh: 'ผ้าทอมือลายปลาคาบของ', nameEn: 'Pla Karb Khong Hand Woven Fabric', province: 'บึงกาฬ', amphure: 'เซกา', price: 800, category: 'ผ้า', imageCover: '', ratingsAverage: 4 , contact: '0986426448' , description: 'กลุ่มทอผ้ามัดหมี่ย้อมสีธรรมชาติ บ้านท่าเชียงเครือเป็นผ้าทอธรรมชาติ ย้อมด้วยสีมงคล 5 อย่าง มีพะยูง มะยมใบยอคุณขนุนมัดย้อมโคลนจากแม่น้ำฮี้(แม่น้ำที่ไหลผ่านบ้านบ้าเชียงเศรือ)ใส่แล้ว ค้ำคุณอยู่ดีมีแฮง ผ้าลายเฉพาะกลุ่ม คือ"ลายปลาคาคาบของ" เป็นปลาประจำถิ่นของแม่น้ำฮี้' },

  { id: '7', nameTh: 'ผ้าสไบบึงกาฬสีม่วง', nameEn: 'The purple breast cloth', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 350, category: 'ผ้า', imageCover: '', ratingsAverage: 3 , contact: '0890745144' , description: '' },

  { id: '8', nameTh: 'ชาสิรินธรวัลลี', nameEn: 'Sirindhorn Wanli Tea', province: 'บึงกาฬ', amphure: 'บุ่งคล้า', price: 150, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0887447929' , description: '' },

  { id: '9', nameTh: 'สบู่สมุนไพรจากต้นสิรินธรวัลลี', nameEn: 'Sirindhorn Wanli Herbal Soap', province: 'บึงกาฬ', amphure: 'บุ่งคล้า', price: 50, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '0887447929' , description: '' },

  { id: '10', nameTh: 'เมล็ดกาแฟโรบัสต้า (500 กรัม)', nameEn: 'Coffee Beans (500 g)', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 179, category: 'อาหาร', imageCover: '', ratingsAverage: 3 , contact: '0980702776' , description: '' },

  { id: '11', nameTh: 'ข้าวแต๋นน้ำแตงโม', nameEn: 'Rice Crackers with Watermelon Juice', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 35, category: 'อาหาร', imageCover: '', ratingsAverage: 4 , contact: '0896231199' , description: '' },

  { id: '13', nameTh: 'น้ำจิ้มหมูกระทะชาบู', nameEn: 'BBQ Dip Sauce', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 39, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '14', nameTh: 'พวงกุญแจปลามงคล', nameEn: 'Auspicious Fish Keychain', province: 'บึงกาฬ', amphure: 'หอคำ', price: 159, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '' , description: '' },

  { id: '15', nameTh: 'กระเป๋าสาน', nameEn: 'Woven Bag', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 3600, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '16', nameTh: 'กระเป๋าสุภาพสตรี', nameEn: "Women's Handbag", province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 299, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 3 , contact: '' , description: '' },

  { id: '17', nameTh: 'กระเป๋าสาน', nameEn: 'Woven Bag', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 600, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '' , description: '' },

  { id: '18', nameTh: 'เข็มขัดหนังจระเข้', nameEn: 'Belt', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 950, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '19', nameTh: 'กล้วยผง', nameEn: 'Banana Powder', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 150, category: 'อาหาร', imageCover: '', ratingsAverage: 3 , contact: '' , description: '' },

  { id: '20', nameTh: 'ถั่วคั่วทราย', nameEn: 'Sand-Roasted Peanuts', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 35, category: 'อาหาร', imageCover: '', ratingsAverage: 3 , contact: '' , description: '' },

  { id: '21', nameTh: 'พิมเสนน้ำ', nameEn: 'Borneol', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 35, category: 'เบ็ดเตล็ด', imageCover: '', ratingsAverage: 3 , contact: '' , description: '' },

  { id: '22', nameTh: 'กระเป๋าสตางค์', nameEn: 'Wallet', province: 'บึงกาฬ', amphure: 'ปากคาด', price: 550, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '23', nameTh: 'ถาดสาน Size S', nameEn: 'Woven tray size S', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 250, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '' , description: '' },

  { id: '24', nameTh: 'ถาดสาน Size L', nameEn: 'Woven tray size L', province: 'บึงกาฬ', amphure: 'บุ่งคล้่า', price: 350, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '' , description: '' },

  { id: '25', nameTh: 'พวงกุญแจ', nameEn: 'Keychain', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 100, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 4 , contact: '' , description: '' },

  { id: '26', nameTh: 'เสื้อผ้าฝ้ายเข็นมือลายโขงนที', nameEn: 'Khong Natee Hand Woben Cotton', province: 'บึงกาฬ', amphure: 'หอคำ', price: 950, category: 'ผ้า', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '27', nameTh: 'พวงกุญแจควาย', nameEn: 'Buffalo keychain', province: 'บึงกาฬ', amphure: 'หอคำ', price: 159, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '28', nameTh: 'กระเป๋าผ้าทอมือ', nameEn: 'Handmade woven bag', province: 'บึงกาฬ', amphure: 'หอคำ', price: 250, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '29', nameTh: 'กระเป๋าสุภาพสตรี', nameEn: "Women's handbag", province: 'บึงกาฬ', amphure: 'ปากคาด', price: 2500, category: 'งานคราฟต์', imageCover: '', ratingsAverage: 5 , contact: '' , description: '' },

  { id: '30', nameTh: 'กล้วยอบ (500 กรัม)', nameEn: 'Baked banana (500 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '31', nameTh: 'กล้วยสติ๊กไม่โรยงา (500 กรัม)', nameEn: 'Dried banana sticks (non sesame) (500 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '32', nameTh: 'กล้วยสติ๊กโรยงา (400 กรัม)', nameEn: 'Dried banana sticks with sesame (400 g)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 100, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '33', nameTh: 'ข้าวมะลิแดง (1 กิโลกรัม)', nameEn: 'Red hom mali rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 49, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '34', nameTh: 'ข้าวไรซ์เบอร์รี่ (1 กิโลกรัม)', nameEn: 'Riceberry rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 79, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '35', nameTh: 'ข้าวสามสี (1 กิโลกรัม)', nameEn: 'Three color rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 79, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '36', nameTh: 'ข้าวฮาง (1 กิโลกรัม)', nameEn: 'Hang rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 89, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '37', nameTh: 'ข้าวงอก (1 กิโลกรัม)', nameEn: 'Germinated brown rice (1 kg)', province: 'บึงกาฬ', amphure: 'ศรีวิไล', price: 99, category: 'อาหาร', imageCover: '', ratingsAverage: 5 , contact: '0981596155' , description: '' },

  { id: '38', nameTh: 'ผ้าทอลายพู่ดอกฝ้าย (หน้ากว้าง 1 เมตร)', nameEn: 'Phu Dokfai woven fabric', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 500, category: 'ผ้า', imageCover: '', ratingsAverage: 4 , contact: '0956647134' , description: 'กลุ่มทอผ้าพื้นเมืองบ้านสะง้อ คุณแม่สมพรนำภูมิปัญญาตั้งเดิมสมัยก่อน โดยนำโคลนนาคีซึ่งอยู่ใน จุดที่เกิดยั้งไฟพญานาค นำมาหมักเส้นฝ้าย ก่อนจะระทอเป็นผ้าโคสนนาดี คุณสมบัติ ช่วยให้ผ้านุ่ม สีเด่นชัด ซึ่งกระบวนการหมักโคลนจะต้องย้อมตีผ้ายก่อนด้วย สีธรรมชาติ เช่น หมากค้อได้สีเขียว, สีชมพูได้จากมะเหมี่ยวราชพฤกษ์, โคลนให้สีน้ำตาลอ่อน, สีเทา ได้จากปูนกินหมาก จากนั้นก็น่าด้ายที่ยังมสี มาหมักโคลน แล้วนำมาทอเป็นผืน' },

  { id: '39', nameTh: 'เสื้อแขนสั้นคอกลม ลายชลดา', nameEn: 'Chonlada short sleeve t-shirt', province: 'บึงกาฬ', amphure: 'เมืองบึงกาฬ', price: 1400, category: 'ผ้า', imageCover: '', ratingsAverage: 4 , contact: '0956647134' , description: 'กลุ่มทอผ้าพื้นเมืองบ้านสะง้อ คุณแม่สมพรนำภูมิปัญญาตั้งเดิมสมัยก่อน โดยนำโคลนนาคีซึ่งอยู่ใน จุดที่เกิดยั้งไฟพญานาค นำมาหมักเส้นฝ้าย ก่อนจะระทอเป็นผ้าโคสนนาดี คุณสมบัติ ช่วยให้ผ้านุ่ม สีเด่นชัด ซึ่งกระบวนการหมักโคลนจะต้องย้อมตีผ้ายก่อนด้วย สีธรรมชาติ เช่น หมากค้อได้สีเขียว, สีชมพูได้จากมะเหมี่ยวราชพฤกษ์, โคลนให้สีน้ำตาลอ่อน, สีเทา ได้จากปูนกินหมาก จากนั้นก็น่าด้ายที่ยังมสี มาหมักโคลน แล้วนำมาทอเป็นผืน' },

  { id: '40', nameTh: 'ผ้าทอมือ ลายตุงรุ่งเรืองเมืองภูไท แบบที่ 1', nameEn: 'Type 1 tung rung ruang muang phu thai hand woven fabric', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 700, category: 'ผ้า', imageCover: '', ratingsAverage: 4 ,contact: '0909249032' , description: 'กลุ่มทอผ้าพื้นเมืองสาวภูไท บ้านถ้ำเจริญ เดิมทีแต่ละบ้านมีการทอผ้าเลยมารวมตัวกันตั้งกลุ่มทอผ้าเมื่อก่อนใช้สีเคมีแต่พอรวมตัวเป็นกลุ่มแล้วเลยเปลี่ยนเป็นการย้อมสีธรรมชาติทั้งหมดใช้ครามย้อมเป็นหลักลายที่เป็นเอกลักษณ์ของตัวเอง"ลายตุงรุ่งเมืองภูไท"ย้อมประดู่ก่อนแล้วมัดหมี่' },

  { id: '41', nameTh: 'ผ้าทอมือ ลายตุงรุ่งเรืองเมืองภูไท แบบที่ 2', nameEn: 'Type 2 tung rung ruang muang phu thai hand woven fabric', province: 'บึงกาฬ', amphure: 'โซ่พิสัย', price: 700, category: 'ผ้า', imageCover: '', ratingsAverage: 4, contact: '0909249032' , description: 'กลุ่มทอผ้าพื้นเมืองสาวภูไท บ้านถ้ำเจริญ เดิมทีแต่ละบ้านมีการทอผ้าเลยมารวมตัวกันตั้งกลุ่มทอผ้าเมื่อก่อนใช้สีเคมีแต่พอรวมตัวเป็นกลุ่มแล้วเลยเปลี่ยนเป็นการย้อมสีธรรมชาติทั้งหมดใช้ครามย้อมเป็นหลักลายที่เป็นเอกลักษณ์ของตัวเอง"ลายตุงรุ่งเมืองภูไท"ย้อมประดู่ก่อนแล้วมัดหมี่' }
];

export default mockProducts;