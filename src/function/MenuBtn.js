import { useEffect } from 'react'

const MenuBtn = () => {
    useEffect(() => {
        const menuBtn = document.getElementById('menuBtn')
        const sidebar = document.getElementById('sidebar')
        const section = document.getElementById('section')

        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active-nav')
            section.classList.toggle('active-count')
        })
    }, [])
}

export default MenuBtn