import React from 'react';
import starIcon from '../../assets/images/star.svg';
import watcherIcon from '../../assets/images/watcher.svg';
import styles from './styles.module.css';

export default function RepositoryItem({ item }) {
    return (
        <div className={styles.item}>
            <div className={styles.leftWrapper}>
                <img className={styles.img} src={item.owner.avatar_url} alt="image"/>
                <div className={styles.itemInfo}>
                    <div>{item.name}</div>
                    <div>{item.owner.login}</div>
                    <div>{item.language}</div>
                    <div>{item.description}</div>
                </div>
            </div>
            <div className={styles.rightWrapper}>
                <div>
                    <img src={starIcon} alt="star"/>{item.stargazers_count}<span>stars</span>
                </div>
                <div>
                    <img src={watcherIcon} alt="star"/> {item.watchers_count} watchers
                </div>
            </div>
        </div>
    )
}
