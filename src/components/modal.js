export default function Modal({
    enableOverlay,
    children
}) {
    return (
        <div className="modal">
            <div className="content">
                { children }
            </div>
            {
                enableOverlay ?
                    <div className="overlay" />
                    : ''
            }
        </div>
    )
}
