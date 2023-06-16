import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration)

export default function Post({
    username,
    title,
    content,
    created
}) {

    function renderTimeAgo() {
        const difference = dayjs().diff(created)
        const duration = dayjs.duration(difference)

        const days = duration.days();
        console.log(days)
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (days > 0) {
            if(days === 1) return `a day ago`;
            return `${days} days ago`;
        } else if (hours > 0) {
            if(hours === 1) return `an hour ago`;
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            if(minutes === 1) return `a minute ago`;
            return `${minutes} minutes ago`;
        } else {
            return `just now`;
        }
    }

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
                        {renderTimeAgo()}
                    </p>
                </div>
                <p>
                    {content}
                </p>
            </div>
        </div>
    )
}
