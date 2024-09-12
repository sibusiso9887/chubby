import bcrypt from 'bcryptjs';

const data = {
  users: [
   
    {

      name: "Lerato",
      email: "lerato@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerato565',



      //bio

      gender: "male",
      gender_pref: "female",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "22",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "lethabo",
      email: "leraddh9to@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leratodf2',



      //bio

      gender: "male",
      gender_pref: "female",
      category: "onenight",
      size: "medium",
      body: "thick",
      age: "25",



      //location

      province: "limpopo",
      city: "polokwane",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "nthabiseng",
      email: "ledhgs8rato@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerato56c5',



      //bio

      gender: "male",
      gender_pref: "female",
      category: "love",
      size: "large",
      body: "thick",
      age: "32",



      //location

      province: "westerncape",
      city: "cape town",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "Nicole",
      email: "lerfdhd64ato@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leratfeo565',



      //bio

      gender: "male",
      gender_pref: "female",
      category: "swingers",
      size: "exlarge",
      body: "thick",
      age: "42",



      //location

      province: "California",
      city: "Lost angeles",
      country: "Usa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "cathrine",
      email: "lersrrdydtato@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leregbato565',



      //bio

      gender: "male",
      gender_pref: "female",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "22",



      //location

      province: "kwazulunatala",
      city: "durban",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "onica",
      email: "leradtjt6to@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leratgevo565',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "38",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "hope",
      email: "lerato78yt@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leragevvto565',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "25",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "joy",
      email: "ler97guato@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'leratojus565',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "18",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "jeniffer",
      email: "lerahtd4to@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerat54to565',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "29",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

    {

      name: "koketso",
      email: "leradgsto@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerato56445',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "24",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    }, 
     {

      name: "carol",
      email: "lerat44o@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerato56215',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "22",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },


    {

      name: "itumeleng",
      email: "leratrro@gmail.com",
      password: bcrypt.hashSync('123456'),

      isAdmin: true,
      isVerified: true,
      slug: 'lerato56dt465',



      //bio

      gender: "female",
      gender_pref: "male",
      category: "fwb",
      size: "small",
      body: "thick",
      age: "22",



      //location

      province: "gauteng",
      city: "jhb",
      country: "sa",

      //images

      image_1: "https://images.pexels.com/photos/10459949/pexels-photo-10459949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_2: "https://images.pexels.com/photos/8791758/pexels-photo-8791758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_3: "https://images.pexels.com/photos/19291528/pexels-photo-19291528/free-photo-of-woman-in-black-bikini-posing-in-a-swimming-pool.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_4: "https://images.pexels.com/photos/12183707/pexels-photo-12183707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image_5: "https://images.pexels.com/photos/27014351/pexels-photo-27014351/free-photo-of-young-woman-standing-bikini-shoreline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      banner: "https://images.pexels.com/photos/936007/pexels-photo-936007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      image: "https://images.pexels.com/photos/3722151/pexels-photo-3722151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",


      //contact

      phone: "1234567890",
      whatsapp: "12345678920",
      instagram: "www.instagram.com/lerato",
      link: "www.linktree.com/lerato",

      //school

      high_school: "New York High School",
      primary_school: "New York Primary School",
      college: "Yale University",


      //about me

      personality: "introvert",
      mindset: "Modern",
      about_me: "my name is lerato and i am iiking for a friend with benefits ",
      philosophy: "Live by your own rule",


    },

  ],

};
export default data;
