<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Week 3 opdracht 1</title>
    <link rel="stylesheet" href="css/master.css">
    <link rel="stylesheet" href="css/15puzzle.css">
    <script src="js/jquery-3.1.1.js" charset="utf-8"></script>
    <script src="js/15puzzlev2.js" charset="utf-8"></script>
  </head>
  <body>
  <div class="game">
    <?php
      for($r = 0; $r < 4 ; $r++){
        for($c = 0; $c < 4; $c++){
          echo('<img class="gameCell" src="image/puzzle/p' . $r . $c .  '.png" />');
        }
      }
    ?>
  </div>
  </div>
  </body>
</html>
