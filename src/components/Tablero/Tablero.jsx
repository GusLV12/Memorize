import { MemoBlock } from "../MemoBlock/MemoBlock"
import "./Tablero.css"
export function Tablero({ animating, handleMemoClick, memoBlocks }) {
    return (
        <>
            <div className="board">
                {memoBlocks.map((item, index) => {
                    return <MemoBlock key={`${index}_${item.emoji}`} memoBlock={item} animating={animating} handleMemoClick={handleMemoClick} />

                })}

            </div>
        </>
    )
}