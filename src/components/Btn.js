function Btn(params) {
    return(
        <div>
            <button onClick={() => params.clicked()}>tombol</button>
        </div>
    )
}

export default Btn;