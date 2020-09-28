import * as React from 'react';
import './sidebar.scss';
import {Link} from "react-router-dom";


interface LinkProps  {
    text: string,
    slug: string,
}
interface Sidebar {
    customClass: string,
    links: LinkProps[],
    url: string,
}



const Sidebar: React.FC<Sidebar> = ({customClass, links, url}) => {
	return <div className={`${customClass} mainNavigation`}>
		<nav className={'nav flex-column'}>
            {links.map((el, index) =>
                <Link to={`${url}${el.slug}`} className={'nav-link'} key={`${el.slug}-${index}`}>
                    {el.text}
                </Link> )}
        </nav>
	</div>;
};

export default Sidebar;
