export default function Modal({
    enableOverlay,
    children
}) {
    return (
        <div
            className={enableOverlay ? 'modal' : 'modal sign-up'}
        >
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
