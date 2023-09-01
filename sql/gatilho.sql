-- Toda vez que um usuário fizer uma avaliação, atualizar a nota global do livro
create or replace function rating_update() returns trigger as $rating_update$
begin
	update books set gl_rating = ((gl_rating + NEW.rating) / 2) where NEW.bid = books.bid;
	return null;
end;
$rating_update$ language plpgsql;

create or replace trigger new_review
after insert on reviews
for each row
execute function rating_update();