import { FC } from "react";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchBarProps> = ({ value, onChange, onKeyPress }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
                onKeyDown={onKeyPress}
            />
            <img src={`https://img.icons8.com/?size=100&id=7695&format=png&color=000000`} alt={"search"} />
        </div>
    )
}

export default Search