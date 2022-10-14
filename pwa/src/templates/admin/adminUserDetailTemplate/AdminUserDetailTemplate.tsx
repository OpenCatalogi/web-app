import * as React from "react";
import * as styles from "./AdminUserDetailTemplate.module.css";
import {
  Button,
  Heading1,
  Heading2,
  LeadParagraph,
  Link,
  Tab,
  TabContext,
  TabPanel,
  Tabs,
} from "@gemeente-denhaag/components-react";
import { Container, InfoCard, BadgeCounter } from "@conduction/components";
import { navigate } from "gatsby";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, CallIcon } from "@gemeente-denhaag/icons";
import { useTranslation } from "react-i18next";
import componentPlacholderLogo from "../../assets/images/grey.png";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";
import { QueryClient } from "react-query";
import { useComponent } from "../../../hooks/components";
import Skeleton from "react-loading-skeleton";
import { TEMPORARY_COMPONENTS } from "../../../data/components";
import { RatingIndicatorTemplate } from "../../templateParts/ratingIndicator/RatingIndicatorTemplate";
import { Tag } from "../../../components/tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNodes,
  faDatabase,
  faHouse,
  faInfoCircle,
  faLayerGroup,
  faRepeat,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { ToolTip } from "../../../components/toolTip/ToolTip";
import { categories, TCategories } from "../../../data/categories";
import { categories as _categories } from "../../../data/filters";
import { OrganizationCard } from "../../../components/organizationCard/OrganizationCard";
import { GitHubLogo } from "../../../assets/svgs/GitHub";
import { DependenciesTemplate } from "../../templateParts/dependenciesTemplates/ComponentDependenciesTemplate";
import { FiltersContext } from "../../../context/filters";
import { ComponentCardsAccordionTemplate } from "../../templateParts/componentCardsAccordion/ComponentCardsAccordionTemplate";
import { DownloadTemplate } from "../../templateParts/download/DownloadTemplate";
import { TEMPORARY_USERS } from "../../../data/users";
import { AdminTemplate } from "../../templateParts/adminTemplate/AdminTemplate";

interface AdminUsersDetailTemplateProps {
  userId: string;
}

export const AdminUsersDetailTemplate: React.FC<AdminUsersDetailTemplateProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const [filters, setFilters] = React.useContext(FiltersContext);

  const tempComponent = TEMPORARY_USERS.find((user: any) => user.id === userId) ?? TEMPORARY_USERS[1];

  const TempComponentsDependencies = TEMPORARY_COMPONENTS.slice(1, 9);
  const TempComponentsSchema = TEMPORARY_COMPONENTS.slice(0, 1);
  const TempComponentsProcesses = TEMPORARY_COMPONENTS.slice(11, 15);

  //   const layer: TCategories = t(_.upperFirst(tempComponent.embedded?.nl.embedded.commonground.layerType));
  //   const category =
  //     layer &&
  //     categories[layer].find((category) => {
  //       return category.value === tempComponent.categories;
  //     });

  //   if (tempComponent.isError) return <>Something went wrong...</>;

  return (
    <AdminTemplate>
      <Container>
        <div className={styles.backButton} onClick={() => navigate("/admin/users")}>
          <Link icon={<ArrowLeftIcon />} iconAlign="start">
            {t("Back to Users")}
          </Link>
        </div>

        <section>
          <Heading1>{`${tempComponent.name} ${tempComponent.lastname}`}</Heading1>
        </section>
        <section>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t("Name")}</TableHeader>
                <TableHeader>{t("Lastname")}</TableHeader>
                <TableHeader>{t("Telephone number")}</TableHeader>
                <TableHeader>{t("Email")}</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <span>{tempComponent.name}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.lastname}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.telephone}</span>
                </TableCell>

                <TableCell>
                  <span>{tempComponent.email}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </Container>
    </AdminTemplate>
  );
};
