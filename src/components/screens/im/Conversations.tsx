import {FC} from "react";

import Input from "../../ui/input/Input";
import ConversationItem from "./conversationItem/ConversationItem";

import styles from '@/assets/styles/screens/Conversations.module.scss'


const Conversations:FC = () => {
    return (
        <div className={styles.conversations}>
                <div style={{padding: '20px'}}>
                    <Input placeholder="Поиск..." />
                </div>
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
        </div>
    );
};

export default Conversations;