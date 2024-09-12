import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      slug: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      resetToken: { type: String },
      
      isAdmin: { type: Boolean, default: false, required: true },
      
   
  
        
           //bio
    
           gender: { type: String, required: false },
           gender_pref: { type: String, required: false },
           category: { type: String, required: false },
           size: { type: String, required: false },
           body: { type: String, required: false },
           age: { type: String, required: false },
     
         
     
              //location
       
       
           province: { type: String, required: false },
           city: { type: String, required: false },
           country: { type: String, required: false },
     
             //images
       
           image_1: { type: String, required: false },
           image_2: { type: String, required: false },
           image_3: { type: String, required: false },
           image_4: { type: String, required: false },
           image_5: { type: String, required: false },
     
           banner: { type: String, required: false },
           image: { type: String, required: false },
       
        
          //contact
          
           phone: { type: String, required: false },
           whatsapp: { type: String, required: false },
           instagram: { type: String, required: false },
           link: { type: String, required: false },
     
              //school
       
           high_school: { type: String, required: false },
           primary_school: { type: String, required: false },
           college: { type: String, required: false },
        
       
           //services
       
           personality: { type: String, required: false },
           mindset: { type: String, required: false },
           about_me: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
