var print_log = "";
			function nonlin(x) {
    			return 1 / (1 + nj.exp(-x));
    		}
    		function nonli_dev(x) {
        		return x * (1 - x);
        	}

			X = nj.array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]]);
			y = nj.array([[0,1,1,0]]).T;

			var syn0 = nj.array([[2*Math.random()-1],[2*Math.random()-1],[2*Math.random()-1]]);
			//print_log = syn0;
			//console.log(syn0);
			
			for (ab = 0; ab < 4000; ab ++ ) {
    			l0 = X;
    			l1 = nj.sigmoid(nj.dot(l0, syn0));

    			l1_error = nj.array([[0,0,0,0]]).T;
    			l1_delta = nj.array([[0,0,0,0]]).T;
    			for (i = 0; i < l1_error.selection.data.length; i++) {
    				l1_i = l1.selection.data[i];
    				y_i = y.selection.data[i];

    				l1_error.selection.data[i] =  y_i - l1_i;

    				l1_error_i = l1_error.selection.data[i];

    				l1_delta.selection.data[i] = l1_error_i * nonli_dev(l1_i);
    			}

    			syn0_delta = nj.dot(l0.T, l1_delta);

    			for (i = 0; i < syn0.selection.data.length; i++) {
    				a = syn0.selection.data[i];
    				syn0.selection.data[i] += syn0_delta.selection.data[i];
    			}
    			//print_log = print_log + "<br>" + l1_error;
    		}

			//console.log(y);
			print_log = print_log + "<br>" + l1;