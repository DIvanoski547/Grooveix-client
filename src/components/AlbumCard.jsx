function AlbumCard ({albumImage, albumName, artistsNames}) {
    return (
        <div className="album_card">
            <p>{albumImage}</p>
            <p>{albumName}</p>
            <p>{artistsNames}</p>
        </div>
    )
}
export default AlbumCard;