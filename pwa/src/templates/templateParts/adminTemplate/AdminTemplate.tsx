import * as React from "react";
import * as styles from "./AdminTemplate.module.css";
import { useTranslation } from "react-i18next";
import { Container, PrivateRoute } from "@conduction/components";
import { isLoggedIn } from "../../../services/auth";
import { GatsbyContext } from "../../../context/gatsby";
import { navigate } from "gatsby";
import { Sidenav, SidenavItem, SidenavLink, SidenavList } from "@gemeente-denhaag/sidenav";
import { faFile, faHouse, faList, faListCheck, faServer, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminTemplate: React.FC = ({ children }) => {
  return (
    <PrivateRoute authenticated={isLoggedIn()}>
      <Container layoutClassName={styles.container}>
        <Menu layoutClassName={styles.menu} />
        <div className={styles.content}>{children}</div>
      </Container>
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

interface MenuProps {
  layoutClassName?: string;
}

const Menu: React.FC<MenuProps> = ({ layoutClassName }) => {
  const { t } = useTranslation();
  const {
    location: { pathname },
  } = React.useContext(GatsbyContext);

  const menuItems: MenuItem[] = [
    { label: t("Dashboard"), href: "/admin", current: pathname === "/admin", icon: <FontAwesomeIcon icon={faHouse} /> },

    {
      label: t("Components"),
      href: "/admin/components",
      current: pathname === "/admin/components",
      icon: <FontAwesomeIcon icon={faFile} />,
    },
    {
      label: t("My Catalogi"),
      href: "/admin/myCatalogi",
      current: pathname === "/admin/myCatalogi",
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: t("Catalogi"),
      href: "/admin/catalogi",
      current: pathname === "/admin/catalogi",
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
    {
      label: t("Sources"),
      href: "/admin/sources",
      current: pathname === "/admin/sources",
      icon: <FontAwesomeIcon icon={faServer} />,
    },
    {
      label: t("User"),
      href: "/admin/user",
      current: pathname === "/admin/user",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string): void => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className={layoutClassName && layoutClassName}>
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
    </div>
  );
};
