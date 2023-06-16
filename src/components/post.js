import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

import useUser from "../hooks/useUser";

import DELETE from '../icons/delete.svg';
import EDIT from '../icons/edit.svg';


dayjs.extend(duration)

export default function Post({
    post,
    setIsEditModalOpen,
    setSelectedPost,
    setIsDeleteModalOpen,
}) {
    const { username } = useUser();

    function renderTimeAgo() {
        const difference = dayjs().diff(post.created_datetime)
        const duration = dayjs.duration(difference)

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (days > 0) {
            if (days === 1) return `a day ago`;
            return `${days} days ago`;
        } else if (hours > 0) {
            if (hours === 1) return `an hour ago`;
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            if (minutes === 1) return `a minute ago`;
            return `${minutes} minutes ago`;
        } else {
            return `just now`;
        }
    }

    async function handleEdit() {
        setSelectedPost(post);
        setIsEditModalOpen(true);
    }

    async function handleDelete() {
        setSelectedPost(post);
        setIsDeleteModalOpen(true);
    }

    return (
        <div className="post">
            <div className="title">
                <h2>
                    {post.title}
                </h2>
                {
                    post.username === username ?
                        <div className="edit-delete-icons">
                            <button onClick={() => handleEdit()}>
                                <img src={EDIT} alt="edit" />
                            </button>
                            <button onClick={() => handleDelete()}>
                                <img src={DELETE} alt="delete" />
                            </button>
                        </div>
                        : ''
                }
            </div>
            <div>
                <div
                    className="justify-content-space-between color-dark-gray"
                >
                    <p>
                        @{post.username}
                    </p>
                    <p>
                        {renderTimeAgo()}
                    </p>
                </div>
                <p>
                    {post.content}
                </p>
            </div>
        </div>
    )
}
