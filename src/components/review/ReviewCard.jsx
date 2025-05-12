export function ReviewCard({ userName, name, review }) {
    return (
        <article>
            <header>
                <img src={'../../images/reviewpeople/${userName}.png'} alt="avatar" />
                <div>
                    <strong>{name}</strong>
                    <span>@{userName}</span>
                </div>
            </header>

            <aside>
                <p>{review}</p>
            </aside>
        </article>
    );
}