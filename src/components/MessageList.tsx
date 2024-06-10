import { clsx } from "clsx";

type MessageListProps = {
    messages: string;
    type: "error" | "caution";
    icon: string;
};

/**
 * Renders a list of messages with an icon and styling based on the type.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.messages - The messages to be displayed, separated by newlines.
 * @param {string} props.type - The type of the message list, currently "error" or "caution".
 * @param {string} props.icon - The URL of the icon to be displayed alongside the messages.
 *
 * @returns {JSX.Element} The rendered MessageList component.
 */
const MessageList = ({
    messages,
    type,
    icon,
}: MessageListProps): JSX.Element => {
    const altText: string = `${type} icon`;

    return (
        <div
            className={clsx(
                "col-span-2 mt-6 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm",
                type === "error"
                    ? "bg-error-dark text-white"
                    : "bg-caution text-dark",
            )}
        >
            <img
                src={icon}
                className="h-fit"
                alt={altText}
                aria-hidden="true"
            />
            <ul className="flex list-none flex-col gap-1">
                {messages.split("\n").map((line, index) => (
                    <li key={index} className="font-medium leading-normal">
                        {line}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
