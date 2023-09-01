--Item2.a)
--VIEW: id dos usuarios que são membros de grupos
create view GroupMembers as 
select uid
from users
natural join joins
where joins.user_role = 'Member';

--Item2.b) Parte a1: group by e having
--Nome dos grupos que tem menos de 5 usuarios de cargo: membro. (Groups, Joins, view GroupMembers)
select name, count(uid)
from groups
natural join joins
natural join GroupMembers
group by name
having count(uid) < 5;

--Item2.b) Parte a2: group by
--Numero de livros de romance escritos por cada autor. (Authors, Writes, ClassificationBooks)
select authors.name, count(writes.bid)
from writes
natural join authors
natural join classificationBooks
where classificationBooks.book_genre = 'Romance'
group by authors.name;

--Item2.b) Parte b1: subconsultas
-- Nome e descrição das listas que a usuária Luisa votou e curtiu
select lists.name, listopias.description
from lists
join listopias using(lid)
where lid in (
	select votesLikes.lid
	from votesLikes
	join users using(uid)
	where votesLikes.likelto = TRUE and votesLikes.lid in (
		select lid
		from votesLikes
		where bid is not null and users.username = 'Luisa'
	) 
	and users.username = 'Luisa'
);

--Item2.b) Parte b1: subconsultas
--Nome de usuario e de grupo dos usuarios com cargos administrativos
select users.username, groups.name, joins.user_role
from users
natural join joins
natural join groups
where joins.uid not in (
	select uid
	from GroupMembers
);

--Item2.b) Parte c1: NOT EXISTS
-- Nome dos usuarios que estão em todos os grupos que o usuario 1 esta, e que ja postaram algo. (Users, Topics, Joins)
select username
from users
natural join topics
where topics.uid in(
	select uid
	from users as u1
	where uid <> 1 and not exists(
		select gid
		from users 
		natural join joins
		where uid = 1 and gid not in(
			select gid
			from joins
			where uid = u1.uid and uid in (
				select uid
				from GroupMembers
			)
		) 
	)
);

--Item2.b) Outras consultas
--Nome dos desafios iniciados pelo usuario Pablo. (Challenges, Starts, Users)
select users.username, users.uid, challenges.name
from challenges
natural join starts
natural join users
where users.username like 'Pablo%';

--Item2.b) Outras consultas
--Para cada grupo, nome dos tópicos, comentários e nome do usuário que os postou
select name, title, topic_comment, users.username commentor, comment_date
from groups join topics using (gid) join topicComments TC using(tid) join users on (TC.uid = users.uid)

--Item2.b) Outras consultas
--Listas com livros do machado de assis que o rating medio dos livros dele sejam maiores que 3. (Lists, ListContains, Writes, Books)
select lists.name as "Nome da lista", avg(books.gl_rating) as "Media de Rating"
from lists
natural join listContains
natural join writes
join books on books.bid = writes.bid
where writes.aid = 3
group by lists.name
having avg(books.gl_rating) >= 4.3;

--Item2.b) Outras consultas
-- Username dos usuários que o usuário 1 segue
select follower.username
from users
join followUsers on (followUsers.uid = users.uid) 
join users as follower on (follower.uid = followUsers.following_id)
where users.uid = 1;

