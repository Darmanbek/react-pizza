import React from 'react';
import ContentLoader from 'react-content-loader';
import "./skeletonCartItem.scss";

const SkeletonCartItem = () => {
    return (
        <div className="skeleton-cart-item">
            <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <circle cx="80" cy="75" r="75" />
                <rect x="165" y="10" rx="0" ry="0" width="200" height="20" />
                <rect x="165" y="100" rx="0" ry="0" width="120" height="16" />
                <rect x="165" y="120" rx="0" ry="0" width="150" height="16" />
                <rect x="725" y="50" rx="25" ry="25" width="150" height="50" />
                <rect x="950" y="65" rx="0" ry="0" width="80" height="16" />
                <circle cx="1070" cy="72.5" r="16" />
                <circle cx="1120" cy="72.5" r="16" />
            </ContentLoader>
        </div>
    )
}

export default SkeletonCartItem