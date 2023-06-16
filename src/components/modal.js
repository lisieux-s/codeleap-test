export default function Modal({
    enableOverlay,
    children
}) {
    return (
        <div className="modal">
            {
                enableOverlay ?
                    <div className="overlay" />
                    : ''
            }
            <div className="content">
                {children}
            </div>
        </div>
    )
}
