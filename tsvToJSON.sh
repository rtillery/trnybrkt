cat tmp2.txt | sed "s|^\([^\t]\+\)\t\([^\t]\+\)\t\([^\t]\+\)\t\([^\t]\+\)\t[^\t]\+\t\([^$]\+\)$|{ club: \'\1\', team: \'\2\', friendlyName: \'\3\', code: \'\4\', points: \5 },|"
