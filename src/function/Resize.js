import { React, useEffect } from 'react'

const Resize = () => {
    useEffect(() => {
        const sideBarId = document.getElementById('sidebar')
        window.addEventListener('resize', function() {
            let windowWidth = this.window.innerWidth
            if (windowWidth <= 750) {
                sideBarId.classList.remove('active-nav')
            }
        })
    }, [])
}

export default Resize