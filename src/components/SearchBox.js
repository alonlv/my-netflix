function SearchBox(props) {
    let search = props.search
    return (
        <div>
            <b>Write the movie name you're looking for:</b>
            <input id="searchBox" placeholder="Movie name" onChange={(e) => search(e.target.value)}></input>
            <b hidden="true">  Year: </b>
            <input hidden="true" type="number" min="1970" max={new Date().getFullYear() + 2}></input>
            <input hidden="true" type="checkbox" id="movietype"></input>
            <label hidden="true" for="movietype">Movie</label>
            <input hidden="true" type="checkbox" id="seriestype"></input>
            <label hidden="true" for="seriestype">Seriest</label>

        </div>
    );

}
export default SearchBox;