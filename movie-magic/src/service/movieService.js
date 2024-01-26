const movies = [
    {
        title: 'The little mermaid',
        genre: 'drama',
        director: 'someone',
        date: '2022',
        imageUrl: '/img/the-little-mermaid.jpg',
        rating: '5',
        description: "The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventure. Longing to find out more about the world beyond the sea, Ariel visits the surface and falls for the dashing Prince Eric. Following her heart, she makes a deal with the evil sea witch, Ursula, to experience life on land."
},

];
exports.getAll = () => {
    return movies;
};

exports.create = (movieData) => {
    movies.push(movieData);
}
