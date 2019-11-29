from django.db import models


class OpeningPosition(models.Model):
    class Meta:
        db_table = "opening_position"

    position_id = models.AutoField(primary_key=True)
    fen = models.CharField(max_length=127)
    stockfish_evaluation = models.FloatField(null=True)


class OpeningMove(models.Model):
    class Meta:
        db_table = "opening_move"

    def __str__(self):
        ellipses = ('..' if self.side == 'b' else '')
        move_string = '%d. %s%s - %s'
        move_info = (self.number, ellipses, self.san, self.name)
        return move_string % move_info

    move_id = models.AutoField(primary_key=True)
    name = models.CharField(null=True, max_length=255, blank=True)
    san = models.CharField(max_length=15)
    number = models.IntegerField()
    side = models.CharField(max_length=1, choices=(
        ('w', 'white'), ('b', 'black')
    ))
    previous_move = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.SET_NULL
    )
    position = models.ForeignKey(
        'OpeningPosition', null=True, on_delete=models.SET_NULL
    )

