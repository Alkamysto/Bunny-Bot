import chalk from "chalk";
import dayjs from "dayjs";

dayjs.locale("FR");

export default class Logger {
  private index(): string {
    return "[ " + chalk.bold.magenta(dayjs().format("LT")) + " ";
  }

  public send(content: string, statut: string) {
    switch (statut.toUpperCase()) {
      case "ERROR":
        console.log(
          this.index() +
            chalk.bgRed("ERROR") +
            " ] > " +
            chalk.bold.gray(content)
        );
        break;
      case "ALERT":
        console.log(
          this.index() +
            chalk.bgYellow("ALERT") +
            " ] > " +
            chalk.bold.gray(content)
        );
        break;
      case "READY":
        console.log(
          this.index() +
            chalk.bgGreen("READY") +
            " ] > " +
            chalk.bold.gray(content)
        );
        break;
      case "NOTIF":
        console.log(
          this.index() +
            chalk.bgCyan("NOTIF") +
            " ] > " +
            chalk.bold.gray(content)
        );
        break;
    }
  }

  public ascii: string = `
::::::::: :::::::::: ::::::::  :::    ::: :::::::::: :::
     :+:            :+:    :+: :+:   :+:             :+:
    +:+             +:+        +:+  +:+              +:+
          +#++:++#   #++:++#+             +#++:++#      
  +#+                      +#+ +#+  +#+              +#+
 #+#                #+#    #+# #+#   #+#             #+#
######### ########## ########  ###    ### ########## ##########
`;
}
