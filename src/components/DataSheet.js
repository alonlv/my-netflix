import { render } from '@testing-library/react';
import React from 'react';

function DataShit(props) {
    const MovieData = props.movieData
    //console.log(MovieData)
    return (
        <table class="table table-dark table-borderless" id="moviedata">
            <thead>
                <tr>
                    <th scope="col">Info Type</th>
                    <th scope="col">Data</th>
                </tr>
            </thead>
            <tbody>
                <tr><th scope="row">Title:</th><td>
                    <a href={"https://www.imdb.com/title/" + MovieData["Year"]}>
                        {MovieData['Title']}
                    </a></td></tr>
                <tr><th scope="row"> Year: </th> <td>{MovieData['Year']}</td> </tr>
                <tr><th scope="row"> Rated: </th> <td>{MovieData['Rated']}</td></tr>
                <tr><th scope="row"> Released: </th> <td>{MovieData['Released']}</td></tr>
                <tr><th scope="row"> Runtime: </th> <td>{MovieData['Runtime']}</td></tr>
                <tr><th scope="row"> Genre: </th> <td>{MovieData['Genre']}</td></tr>
                <tr><th scope="row"> Director: </th> <td>{MovieData['Director']}</td></tr>
                <tr><th scope="row"> Writer: </th> <td>{MovieData['Writer']}</td></tr>
                <tr><th scope="row"> Actors: </th> <td>{MovieData['Actors']}</td></tr>
                <tr><th scope="row"> Language: </th> <td>{MovieData['Language']}</td></tr>
                <tr><th scope="row"> Awards: </th> <td>{MovieData['Awards']}</td></tr>
                <tr><th scope="row"> imdbRating: </th> <td>{MovieData['imdbRating']}</td></tr>
                <tr><th scope="row"> Type: </th> <td>{MovieData['Type']}</td></tr>
                <tr><th scope="row"> Awards: </th> <td>{MovieData['Awards']}</td></tr>
            </tbody>
        </table>


    );
}
export default DataShit;

