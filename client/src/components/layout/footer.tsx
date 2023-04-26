import classes from "../../styles/layout.module.scss";
import { Container } from "./container";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>footer</Container>
      <div className={classes.secondFooter}>
        <Container>
          <div>@2023 КурортОптТорг | Все права защищены</div>
        </Container>
      </div>
    </footer>
  );
};
