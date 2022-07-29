import React from 'react';
import ContentLoader from 'react-content-loader';
import "./skeletonItem.scss";

const SkeletonItem = () => {
    return (
        <div className='skeleton-item'>
            <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <circle cx="150" cy="150" r="125" />
                <rect x="0" y="325" rx="0" ry="0" width="130" height="16" />
                <rect x="0" y="365" rx="0" ry="0" width="100%" height="16" />
                <rect x="0" y="395" rx="0" ry="0" width="100%" height="16" />
                <rect x="0" y="470" rx="0" ry="0" width="150" height="30" />
                <rect x="290" y="465" rx="20" ry="20" width="80" height="40" />
            </ContentLoader>
        </div>
    )
}

export default SkeletonItem;