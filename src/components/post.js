import dayjs from "dayjs";

export default function Post({
    username,
    title,
    content,
    created
}) {

    function calculateTimeAgo() {
        const difference = dayjs().diff(created)

        // console.log(dayjs(difference).day())
        // console.log(dayjs(difference).hour())
        // console.log(dayjs(difference).minute())


    }

    calculateTimeAgo();

    return (
        <div className="post">
            <div className="title">
                <h2>
                    {title}
                </h2>
            </div>
            <div>
                <div
                    className="justify-content-space-between color-dark-gray"
                >
                    <p>
                        @{username}
                    </p>
                    <p>
                        minute(s) ago
                    </p>
                </div>
                <p>
                    {content}
                </p>
            </div>
        </div>
    )
}
