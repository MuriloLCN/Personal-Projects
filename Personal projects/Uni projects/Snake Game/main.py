import pygame
import random

score = 0
kills = 0


class Food:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def draw(self, screen: pygame.display):
        # Draws the food on the screen
        pygame.draw.rect(screen, [255, 120, 0], (self.x, self.y, 10, 10))

    def respawn(self, width: int, height: int, used_slots: list):
        # Respawns the food in a random, free position
        self.x = (random.randrange(0, width) // 10) * 10
        self.y = (random.randrange(0, height) // 10) * 10
        while (self.x, self.y) in used_slots:
            self.x = (random.randrange(0, width) // 10) * 10
            self.y = (random.randrange(0, height) // 10) * 10


class Snake:
    def __init__(self, x: int, y: int, color: list):
        self.x = x
        self.y = y
        self.color = color
        self.body = [(x, y)]

    def update(self, dx: int, dy: int, food: Food, width: int, height: int, bot, is_player: bool):
        global score
        # Updates the snake position
        self.x = (dx + self.x) % width
        self.y = (dy + self.y) % height
        self.body.append((self.x, self.y))
        # Only allow it's size to grow if it reaches the food
        if not (self.x == food.x and self.y == food.y):
            del self.body[0]
        else:
            food.respawn(width, height, self.body + bot.body)
            if is_player:
                score += 1

    def check_collision(self, other_pos: list, is_bot=False):
        global kills
        # Checks collision with itself or the other snake
        if (self.x, self.y) in other_pos:
            if is_bot:
                kills += 1
            return True
        if (self.x, self.y) in self.body[:-1]:
            return True
        return False

    def respawn(self, used_slots: list, width: int, height: int):
        # Respawns itself in a random, free position
        self.x = (random.randrange(0, width) // 10) * 10
        self.y = (random.randrange(0, height) // 10) * 10

        while (self.x, self.y) in used_slots:
            self.x = (random.randrange(0, width) // 10) * 10
            self.y = (random.randrange(0, height) // 10) * 10
        self.body = [(self.x, self.y)]

    def draw(self, rainbow: bool, screen: pygame.display):
        # Draws the snake on the screen
        color = self.color
        for piece in self.body:
            if rainbow:
                color = [piece[0] % 255, piece[1] % 255, (self.x * self.y) % 255]
            pygame.draw.rect(screen, color, (piece[0], piece[1], 10, 10))


def get_bot_dx_dy(bot: Snake, food: Food) -> list:
    # Gets the next bot movement based on it's current position and food position
    if bot.x < food.x:
        return [10, 0]
    if bot.x > food.x:
        return [-10, 0]
    if bot.y < food.y:
        return [0, 10]
    if bot.y > food.y:
        return [0, -10]
    return [0, 0]


def main():
    global score, kills
    # Initializing parameters
    pygame.init()

    width = 400
    height = 400

    game_screen = pygame.display.set_mode([width, height])
    pygame.display.set_caption('Snake game')

    clock = pygame.time.Clock()

    font = pygame.font.SysFont('comic sans', 25)
    game_over_message = font.render('Wasted', True, [255, 0, 0])
    play_message = font.render('P - Play again  Q - Quit', True, [255, 120, 0])

    player = Snake(width // 2, height // 2, [0, 0, 255])
    food = Food(0, 0)
    bot = Snake(width, height, [255, 0, 0])
    bot.respawn(player.body, width, height)
    food.respawn(width, height, player.body + bot.body)

    player_dx = 0
    player_dy = 0

    count = 0

    tick = 10
    rainbow = False

    still_playing = True
    game_over = False

    score_text = font.render(f'Score: {score} | Kills: {kills}', True, [0, 125, 255])
    # Game loop
    while still_playing:

        while not game_over:
            # In-game

            # Get input events
            for event in pygame.event.get():

                if event.type == pygame.QUIT:
                    pygame.quit()
                    quit()

                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT and player_dx != 10:
                        player_dx = -10
                        player_dy = 0
                    if event.key == pygame.K_RIGHT and player_dx != -10:
                        player_dx = 10
                        player_dy = 0
                    if event.key == pygame.K_UP and player_dy != 10:
                        player_dy = -10
                        player_dx = 0
                    if event.key == pygame.K_DOWN and player_dy != -10:
                        player_dy = 10
                        player_dx = 0
                    if event.key == pygame.K_SPACE:
                        rainbow = True
                        tick = 30
                    else:
                        rainbow = False
                        tick = 10

            # Set colors and keep count when space is pressed
            if rainbow:
                bg_color = [(player.y % 255)//2 + 120,
                            (player.x % 255)//2 + 120,
                            ((player.x//2 + player.y//2) % 255)//2 + 120]
                count += 1
                count = count % 3
            else:
                bg_color = [200, 200, 200]
                count = 0

            # Get next bot movement
            temp = get_bot_dx_dy(bot, food)
            bot_dx = temp[0]
            bot_dy = temp[1]

            # Updates their position
            player.update(player_dx, player_dy, food, width, height, bot, True)
            if count == 0:
                # When in rainbow mode, bot only moves every 3 ticks
                bot.update(bot_dx, bot_dy, food, width, height, player, False)

            # Collision checks
            if player.check_collision(bot.body):
                game_over = True
            elif bot.check_collision(player.body, True):
                bot.respawn(player.body, width, height)

            # Draw stuff to screen
            score_text = font.render(f'Score: {score} | Kills: {kills}', True, [0, 125, 255])
            game_screen.fill(bg_color)
            player.draw(rainbow, game_screen)
            bot.draw(False, game_screen)
            food.draw(game_screen)
            game_screen.blit(score_text, [0, 0])
            pygame.display.update()
            clock.tick(tick)

        # When no longer playing, i.e, player has died
        # Display death screen
        game_screen.fill([50, 50, 50])
        game_screen.blit(game_over_message, [width // 3, height // 3])
        game_screen.blit(play_message, [width // 5, height - height // 5])
        game_screen.blit(score_text, [0, 0])
        pygame.display.update()

        # Wait for user to choose an input
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:

                if event.type == pygame.QUIT:
                    still_playing = False
                    game_over = True

                if event.key == pygame.K_q:
                    still_playing = False
                    game_over = True

                if event.key == pygame.K_p:
                    # Keep playing -> Reset game state and start again
                    game_over = False
                    player = Snake(width // 2, height // 2, [0, 0, 255])
                    player_dx, player_dy = 0, 0
                    food = Food(0, 0)
                    bot = Snake(width, height, [255, 0, 0])
                    score = 0
                    kills = 0
                    bot.respawn(player.body, width, height)
                    food.respawn(width, height, player.body + bot.body)

    pygame.quit()
    return


main()
