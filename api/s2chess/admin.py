from django.contrib import admin
import chess

from .models import OpeningMove
from .models import OpeningPosition


class OpeningMoveAdmin(admin.ModelAdmin):
    fields = ('name', 'san', 'previous_move')
    list_filter = ('number', 'side')

    def save_model(self, request, obj, form, change):
        board = chess.Board()
        move_list = [obj.san]
        move = obj
        while move.previous_move is not None:
            move = move.previous_move
            move_list.insert(0, move.san)
        for move in move_list:
            board.push_san(move)
        obj.number = (len(move_list) + 1) // 2
        obj.side = 'w' if len(move_list) % 2 == 1 else 'b'
        position, created = OpeningPosition.objects.get_or_create(
            fen= ' '.join(board.fen().split()[:-2])
        )
        obj.position = position

        super().save_model(request, obj, form, change)


admin.site.register(OpeningMove, OpeningMoveAdmin)
admin.site.register(OpeningPosition)
