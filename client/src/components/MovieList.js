const MovieList = ({ movies, onDeleteMovie, onSelectMovie }) => {
    return (
        <ul className="space-y-2">
            {movies.map((movie) => (
                <li key={movie.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4" onClick={() => onSelectMovie(movie.id)}>
                    <span>{movie.title} (Director: {movie.director})</span>
                    <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700" onClick={() => onDeleteMovie(movie.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
