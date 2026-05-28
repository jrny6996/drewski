//import React from 'react'
import { useState } from 'react'


function Pain() {
    return (
        <div className="">Pain</div>
    )
}


function Button({ children, title }: { children?: any, title?: string }) {

    const [clicked, setClicked] = useState<boolean>(false)
    return (
        <>
            <button
                onClick={() => setClicked(!clicked)}
                style={{
                    background: `${clicked ? "blue" : "red"}`

                }}>  <div>
                    {
                        title ? title : <Pain></Pain>
                    }
                    {children}
                </div></button>
        </>
    )
}

export default Button