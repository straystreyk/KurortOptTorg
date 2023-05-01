import classes from "../../styles/layout.module.scss";
import { Container } from "./container";
import { Logo } from "./header";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.firstFooter}>
          <Logo />
        </div>
      </Container>
      <div className={classes.secondFooter}>
        <Container>
          <div>@2023 КурортОптТорг | Все права защищены</div>
        </Container>
      </div>
    </footer>
  );
};
