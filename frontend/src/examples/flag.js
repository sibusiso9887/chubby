{user.country === 'india' ? (
    <img 
      src='' 
      alt='Indian Flag' 
      className='user_card_details_location_img'
    />
  ) : null}

  {user.country === 'usa' ? (
    <img 
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png' 
      alt='usa Flag' 
      className='user_card_details_location_img'
    />
  ) : null}

  {user.country === 'sa' ? (
    <img 
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1280px-Flag_of_South_Africa.svg.png' 
      alt='sa Flag' 
      className='user_card_details_location_img'
    />
  ) : null}

  {user.country === 'uk' ? (
    <img 
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1920px-Flag_of_the_United_Kingdom_%281-2%29.svg.png' 
      alt='uk Flag' 
      className='user_card_details_location_img'
    />
  ) : null}

  //example

  {user.country === 'uk' ? (
    <img 
      src='' 
      alt='uk Flag' 
      className='user_card_details_location_img'
    />
  ) : null}

