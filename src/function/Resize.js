import { React, useEffect } from 'react'

const Resize = () => {
    useEffect(() => {
        const sideBarId = document.getElementById('sidebar')
        const section = document.getElementById('section')
        window.addEventListener('resize', function() {
            let windowWidth = this.window.innerWidth
            if (windowWidth <= 750) {
                sideBarId.classList.remove('active-nav')
                section.classList.remove('active-count')
            }
        })
    }, [])
}

export default Resize