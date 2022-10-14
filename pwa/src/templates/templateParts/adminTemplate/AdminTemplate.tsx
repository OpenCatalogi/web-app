import * as React from "react";
import * as styles from "./AdminTemplate.module.css";
import { useTranslation } from "react-i18next";
import { PrivateRoute } from "@conduction/components";
import { isLoggedIn } from "../../../services/auth";
import { GatsbyContext } from "../../../context/gatsby";
import { navigate } from "gatsby";
import { Sidenav, SidenavItem, SidenavLink, SidenavList } from "@gemeente-denhaag/sidenav";
import { faFile, faHouse, faList, faListCheck, faServer, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminTemplate: React.FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <PrivateRoute authenticated={isLoggedIn()}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.fillerDiv} />
      </div>
    </PrivateRoute>
  );
};

/**
 * Local side navigation menu component
 */

interface MenuItem {
  label: string;
  href: string;
  icon?: JSX.Element;
  current?: boolean;
}

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const {
    location: { pathname },
  } = React.useContext(GatsbyContext);

  const menuItems: MenuItem[] = [
    { label: t("Dashboard"), href: "/admin", current: pathname === "/admin", icon: <FontAwesomeIcon icon={faHouse} /> },
    {
      label: t("Components"),
      href: "/admin/components",
	  current: pathname.includes("/admin/components"),
      icon: <FontAwesomeIcon icon={faFile} />,
    },
    {
      label: t("My Catalogi"),
      href: "/admin/myCatalogi",
	  current: pathname.includes("/admin/myCatalogi"),
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: t("Catalogi"),
      href: "/admin/catalogi",
	  current: pathname.includes("/admin/catalogi"),
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
    {
      label: t("Sources"),
      href: "/admin/sources",
	  current: pathname.includes("/admin/sources"),
      icon: <FontAwesomeIcon icon={faServer} />,
    },
    {
      label: t("Users"),
      href: "/admin/users",
	  current: pathname.includes("/admin/users"),
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string): void => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <Sidenav>
      <SidenavList>
        {menuItems.map(({ href, label, icon, current }) => (
          <SidenavItem key={href}>
            <SidenavLink href="" onClick={(e) => handleClick(e, href)} current={current}>
              {icon}
              {label}
            </SidenavLink>
          </SidenavItem>
        ))}
      </SidenavList>
    </Sidenav>
  );
};
