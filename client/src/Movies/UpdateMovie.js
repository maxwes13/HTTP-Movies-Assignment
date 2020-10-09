import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";



const initialItem = {
    id: "",
    title: "",
    director: "",
    metasore: "",
    stars: [],
}


const UpdateMovie = (props) => {
    const [updateMovie, setUpdateMovie] = useState(initialItem)
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            console.log( { res } );
            setUpdateMovie(res.data)

        })
        .catch((err) => console.log(err))
    }, [id])

    const changeHandler = (event) => {
        event.persist()
        setUpdateMovie({
            ...updateMovie,
            [event.target.name] : event.target.value
        })
 
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newUpdateMovie = {
          ...updateMovie,
          stars: updateMovie.stars.split(",")
        }
        axios
        .put(`http://localhost:5000/api/movies/${id}`, newUpdateMovie)
        .then((res) => {
            console.log(res.data)
            setUpdateMovie(res.data)

            // props.setMovieList(res.data)
            // push(`/movies/${id}`)
            push(`/movies/${id}`)
        })
        .catch((err) => console.log(err))
    }

    return (
            <div>
              <h2>Update Movie</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  placeholder="Title"
                  value={updateMovie.title}
                />
        
                <input
                  type="text"
                  name="director"
                  onChange={changeHandler}
                  placeholder="Director"
                  value={updateMovie.director}
                />
        
                <input
                  type="number"
                  name="metascore"
                  onChange={changeHandler}
                  placeholder="Metascore"
                  value={updateMovie.metascore}
                />

                <input
                  type="text"
                  name="stars"
                  onChange={changeHandler}
                  placeholder="Stars"
                  value={updateMovie.stars}
                />
         
                <button>Update Movie</button>
              </form>
            </div>
          );
        };
        
        export default UpdateMovie;