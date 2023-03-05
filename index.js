const ytSearch = require('yt-search');
const express = require('express');
const cors = require('cors');

const app = express();



async function searchVideos(keyword) {
  const searchResults = await ytSearch(keyword);
  const videos = searchResults.videos;

  // Extrai as informações necessárias de cada vídeo
  const formattedVideos = videos.map((video) => {
    return {
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      timestamp: video.timestamp,
      duration: video.duration,
      views: video.views,
      author: {
        name: video.author.name,
        url: video.author.url,
      },
    };
  });

  return {items:formattedVideos};
}


// app.all('', function (req, res) {
//   res.header("Access-Control-Allow-Origin", "");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   //...
//  });

app.get('/search', async (req, res) => {
  const keyword = req.query.q; // Obtém a palavra-chave da query string
  
  console.log(req);
  const videos = await searchVideos(keyword); // Busca por vídeos no YouTube

  res.json(videos); // Retorna os vídeos em formato JSON
});


app.listen(process.env.PORT || 80);


// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
