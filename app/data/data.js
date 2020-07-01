const playListData = [
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 1'},
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 2'},
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 3'}
  ];
  
  // const singerData = [
  //   {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
  //   name: 'Ca sĩ 1'},
  //   {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
  //   name: 'Ca sĩ 2'},
  //   {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
  //   name: 'Ca sĩ 3'}
  // ];
  
  const forYou = [
    {picture: 'https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n.jpg'},
    {picture: 'https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Anh%20Thanh%20Ni%C3%AAn.jpg'},
    {picture: 'https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/%C4%90%C3%A1p%20%C3%81n%20c%E1%BB%A7a%20B%E1%BA%A1n%20.jpg'},
    {picture: 'https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/We%20Were%20In%20Love.jpg'},
    // {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'}
  ];
  

  const topicData = [
    {
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRwfB-qpOCUWGWioAlOxTXOdG2HiIS8Eu2PI_0Lh4GgA_8kFdd&usqp=CAU',
      name: 'Cách mạng'
    },
    {
      picture: 'https://avatar-nct.nixcdn.com/playlist/2017/12/18/b/4/e/e/1513580321142_500.jpg',
      name: 'Nhạc trẻ'
    },
    {
      picture: 'https://znews-photo.zadn.vn/w660/Uploaded/ofh_fdmzsofw/2017_05_17/18403557_754897321354685_5074903081571930249_n.jpg',
      name: 'Bolero'
    },
  ];





  const list = [
    {
      title: 'Danh sách bài hát',
      icon: 'headset',
      type: 'songs',
    },
    {
      title: 'Danh sách yêu thích',
      icon: 'favorite',
      type: 'favorite',
    },
    {
      title: 'Playlist',
      icon: 'queue-music',
      type: 'playlist',
    },
  ]

  

  const user = {
    id: 0,
    avatar: "https://cdn2.vectorstock.com/i/1000x1000/10/86/music-equaliser-wave-vector-171086.jpg",
    username: 'ruong',
    fullname: 'NTR',
    createdAt: 1587917439178
  }
  const songs = [
    {

      "id": "1111",
      "url": "https://musicapp1509.000webhostapp.com/Nhac/[Audio]%20Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n%20-%20H2K%20x%20Sli%20Petey.mp3",
      "title": "Phượng Buồn",
      "artist": "H2K ft Sli Petey",
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n.jpg"
    },
    {
      "id": "2222",
      "url": "https://musicapp1509.000webhostapp.com/Nhac/Anh%20Thanh%20Ni%C3%AAn%20-%20HuyR%20-%20OFFICIAL%20MV.mp3",
      "title": "Anh Thanh Niên",
      "artist": "HuyR",
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Anh%20Thanh%20Ni%C3%AAn.jpg"
    },
    {
      "id": "3333",
      "url": "https://musicapp1509.000webhostapp.com/Nhac/[%20Vietsub%20]%20%C4%90%C3%A1p%20%C3%81n%20C%E1%BB%A7a%20B%E1%BA%A1n%20-%20A%20Nh%C5%A9ng%20--%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88%20-%20%E9%98%BF%E5%86%97.mp3",
      "title": "Đáp Án Của Bạn",
      "artist": "A Nhũng",
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/%C4%90%C3%A1p%20%C3%81n%20c%E1%BB%A7a%20B%E1%BA%A1n%20.jpg"
    },
    {
      "id": "4444",
      "url": "https://musicapp1509.000webhostapp.com/Nhac/Davichi,%20T-ara%20%E2%80%93%20We%20Were%20In%20Love.mp3",
      "title": "We Were In Love",
      "artist": "Tara - Davichi",
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/We%20Were%20In%20Love.jpg"
    }
  ]
  const defaultUser = {
    id: 0,
    email: '',
    username: '',
    favorite: []
  }
  const playlist = 
  [
    {
      "artist": "C\u1ea9m Ly", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/C%C3%B4%20G%C3%A1i%20M%E1%BB%9F%20%C4%90%C6%B0%E1%BB%9Dng.jpg", 
      "id": 5, 
      "title": " C\u00f4 G\u00e1i M\u1edf \u0110\u01b0\u1eddng", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/CoGaiMoDuong-CamLy_89r.mp3"
    }, 
    {
      "artist": "A Nh\u0169ng", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/%C4%90%C3%A1p%20%C3%81n%20c%E1%BB%A7a%20B%E1%BA%A1n%20.jpg", 
      "id": 1, 
      "title": " \u0110\u00e1p \u00c1n C\u1ee7a B\u1ea1n", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/[%20Vietsub%20]%20%C4%90%C3%A1p%20%C3%81n%20C%E1%BB%A7a%20B%E1%BA%A1n%20-%20A%20Nh%C5%A9ng%20--%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88%20-%20%E9%98%BF%E5%86%97.mp3"
    }, 
    {
      "artist": "Jang Nara", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Sweet%20Dream%20.jpg", 
      "id": 3, 
      "title": " Sweet Dream", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/Jang%20Nara%20%E2%80%93%20Sweet%20Dream.mp3"
    }, 
    {
      "artist": "H2K", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n.jpg", 
      "id": 2, 
      "title": " Ph\u01b0\u1ee3ng Bu\u1ed3n", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/[Audio]%20Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n%20-%20H2K%20x%20Sli%20Petey.mp3"
    }, 
    {
      "artist": "Justa Tee - Min - \u0110en", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/V%C3%AC%20Y%C3%AAu%20C%E1%BB%A9%20%C4%90%C3%A2m%20%C4%90%E1%BA%A7u%20.jpg", 
      "id": 6, 
      "title": " V\u00ec Y\u00eau C\u1ee9 \u0110\u00e2m \u0110\u1ea7u", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/V%C3%8C%20Y%C3%8AU%20C%E1%BB%A8%20%C4%90%C3%82M%20%C4%90%E1%BA%A6U%20(VYC%C4%90%C4%90)%20-%20MIN%20x%20%C4%90EN%20x%20JUSTATEE%20-%20OFFICIAL%20MUSIC%20VIDEO%20(%EB%AF%BC).mp3"
    }, 
    {
      "artist": "Various Artists", 
      "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Nh%E1%BA%A1c%20Nh%E1%BA%ADt%20.jpg", 
      "id": 4, 
      "title": " Renai Circulation", 
      "url": "https://musicapp1509.000webhostapp.com/Nhac/B%C3%A0i%20H%C3%A1t%20Ti%E1%BA%BFng%20Nh%E1%BA%ADt%20Hay%20Nh%E1%BA%A5t..Kh%C3%B4ng%20Xem%20H%C6%A1i%20Ph%C3%AD.mp3"
    }
  ]
  
  
  export {playListData, topicData, forYou, list, defaultUser, songs, user, playlist}
