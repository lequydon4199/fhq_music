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
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'}
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
    username: ''
  }
  
  export {playListData, topicData, forYou, list, songs, defaultUser, user}
